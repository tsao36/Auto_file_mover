const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const root = __dirname;
const homeDirectory = os.homedir();
const sourceDirectory = path.resolve(process.env.FILE_ROUTER_SOURCE_DIR || path.join(os.homedir(), "Downloads"));
const routes = [
  {
    productName: "PROSet Wi-Fi",
    productPhrase: "intel proset wireless wi-fi",
    destinationRoot: path.resolve(process.env.FILE_ROUTER_DESTINATION_ROOT || path.join(
      homeDirectory,
      "OneDrive - Intel Corporation",
      "Tech Doc",
      "Wireless SW",
      "PROSet WiFi Wireless",
    )),
    folderPrefix: "",
  },
  {
    productName: "PROSet Bluetooth",
    productPhrase: "intel proset wireless bluetooth",
    destinationRoot: path.resolve(process.env.FILE_ROUTER_BLUETOOTH_DESTINATION_ROOT || path.join(
      homeDirectory,
      "OneDrive - Intel Corporation",
      "Tech Doc",
      "Wireless SW",
      "BlueTooth",
    )),
    folderPrefix: "BT ",
  },
];
const iconNames = new Set([
  "arrow-right",
  "check",
  "circle-alert",
  "circle-check",
  "file-text",
  "folder-open",
  "hard-drive",
  "move-right",
  "refresh-cw",
  "scan-search",
  "triangle-alert",
  "x",
]);

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(value));
}

function isSameLocalOrigin(request, requireOrigin) {
  if (!request.headers.host) return false;
  try {
    const host = new URL(`http://${request.headers.host}`);
    if (!["127.0.0.1", "localhost"].includes(host.hostname)) return false;
    if (!request.headers.origin) return !requireOrigin;
    const origin = new URL(request.headers.origin);
    return origin.host === host.host && ["127.0.0.1", "localhost"].includes(origin.hostname);
  } catch {
    return false;
  }
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > 65536) throw new Error("Request body too large");
  }
  return JSON.parse(body);
}

function classifyFileName(fileName) {
  const normalized = fileName.toLocaleLowerCase("en-US");
  if (!normalized.includes("version release")) return null;
  const matchingRoutes = routes.filter((route) => normalized.includes(route.productPhrase));
  if (matchingRoutes.length !== 1) return null;

  const versions = [...new Set([...fileName.matchAll(/(?:^|[^0-9.])([0-9]+(?:\.[0-9]+){3})(?=$|[^0-9.])/g)].map((match) => match[1]))];
  if (versions.length !== 1) return null;

  const version = versions[0];
  const route = matchingRoutes[0];
  const versionFolder = version.split(".").slice(0, 2).join(".");
  return {
    productName: route.productName,
    destinationRoot: route.destinationRoot,
    version,
    destinationFolderName: `${route.folderPrefix}${versionFolder}`,
  };
}

function safeFileName(fileName) {
  return typeof fileName === "string"
    && fileName.length > 0
    && fileName.length <= 260
    && fileName !== "."
    && fileName !== ".."
    && path.basename(fileName) === fileName
    && !/[\\/\0]/.test(fileName);
}

async function directoryExists(directory) {
  try {
    return (await fsp.stat(directory)).isDirectory();
  } catch {
    return false;
  }
}

async function previewDestinationName(directory, fileName) {
  for (let suffix = 0; suffix <= 1000; suffix += 1) {
    const candidateName = suffix === 0 ? fileName : suffixedName(fileName, suffix);
    try {
      await fsp.access(path.join(directory, candidateName));
    } catch (error) {
      if (error.code === "ENOENT") return candidateName;
      throw error;
    }
  }
  return suffixedName(fileName, 1001);
}

async function scanDirectory() {
  const entries = await fsp.readdir(sourceDirectory, { withFileTypes: true });
  const files = [];
  let ignoredCount = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const match = classifyFileName(entry.name);
    if (!match) {
      ignoredCount += 1;
      continue;
    }

    const stats = await fsp.stat(path.join(sourceDirectory, entry.name));
    const destinationDirectory = path.join(match.destinationRoot, match.destinationFolderName);
    const destinationFileName = await previewDestinationName(destinationDirectory, entry.name);
    files.push({
      name: entry.name,
      size: stats.size,
      modifiedAt: Math.trunc(stats.mtimeMs),
      productName: match.productName,
      version: match.version,
      versionFolderName: match.destinationFolderName,
      destinationRoot: match.destinationRoot,
      destinationDirectory,
      destinationFileName,
      nameCollision: destinationFileName !== entry.name,
      folderWillBeCreated: !(await directoryExists(destinationDirectory)),
    });
  }

  files.sort((left, right) => left.name.localeCompare(right.name, "en"));
  return {
    sourceDirectory,
    destinationRoots: routes.map(({ productName, destinationRoot }) => ({ productName, path: destinationRoot })),
    files,
    ignoredCount,
  };
}

function suffixedName(fileName, suffix) {
  const extension = path.extname(fileName);
  const stem = fileName.slice(0, fileName.length - extension.length);
  return `${stem} (${suffix})${extension}`;
}

async function moveOneFile(preview) {
  if (!preview || !safeFileName(preview.name)) {
    return { name: preview?.name || "", status: "failed", message: "檔名無效，檔案未移動。" };
  }

  const match = classifyFileName(preview.name);
  if (!match) return { name: preview.name, status: "failed", message: "檔名不再符合整理條件，請重新掃描。" };

  const sourcePath = path.join(sourceDirectory, preview.name);
  let sourceStats;
  try {
    sourceStats = await fsp.stat(sourcePath);
  } catch {
    return { name: preview.name, status: "failed", message: "來源檔案已不存在，請重新掃描。" };
  }
  if (!sourceStats.isFile()
    || sourceStats.size !== preview.size
    || Math.trunc(sourceStats.mtimeMs) !== preview.modifiedAt) {
    return { name: preview.name, status: "failed", message: "檔案在預覽後有變更，請重新掃描。" };
  }

  const destinationDirectory = path.join(match.destinationRoot, match.destinationFolderName);
  await fsp.mkdir(destinationDirectory, { recursive: true });
  let destinationPath;
  for (let suffix = 0; suffix <= 1000; suffix += 1) {
    const candidateName = suffix === 0 ? preview.name : suffixedName(preview.name, suffix);
    const candidatePath = path.join(destinationDirectory, candidateName);
    try {
      await fsp.copyFile(sourcePath, candidatePath, fs.constants.COPYFILE_EXCL);
      destinationPath = candidatePath;
      break;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
    }
  }
  if (!destinationPath) throw new Error("找不到可用的目的檔名。");

  try {
    await fsp.utimes(destinationPath, sourceStats.atime, sourceStats.mtime);
    const currentStats = await fsp.stat(sourcePath);
    if (currentStats.size !== sourceStats.size || currentStats.mtimeMs !== sourceStats.mtimeMs) {
      throw new Error("來源檔案在移動時有變更。");
    }
    await fsp.unlink(sourcePath);
  } catch (error) {
    try { await fsp.unlink(destinationPath); } catch {}
    throw error;
  }

  return {
    name: preview.name,
    movedName: path.basename(destinationPath),
    productName: match.productName,
    destinationPath,
    status: "moved",
  };
}

async function handleApi(request, response, pathname) {
  if (pathname === "/api/scan" && request.method === "GET") {
    if (!isSameLocalOrigin(request, false)) {
      sendJson(response, 403, { error: "只允許從本機開啟的頁面掃描。" });
      return;
    }
    try {
      sendJson(response, 200, await scanDirectory());
    } catch {
      sendJson(response, 500, { error: "無法讀取 Downloads 資料夾，請確認資料夾存在且可存取。" });
    }
    return;
  }

  if (pathname === "/api/move" && request.method === "POST") {
    if (!isSameLocalOrigin(request, true)) {
      sendJson(response, 403, { error: "只接受本機頁面的移動確認。" });
      return;
    }
    if (!request.headers["content-type"]?.includes("application/json")) {
      sendJson(response, 415, { error: "請使用 JSON 格式送出移動確認。" });
      return;
    }

    let body;
    try {
      body = await readJsonBody(request);
    } catch {
      sendJson(response, 400, { error: "移動清單格式無效，請重新掃描。" });
      return;
    }
    if (!body || !Array.isArray(body.files) || body.files.length === 0 || body.files.length > 100) {
      sendJson(response, 400, { error: "請選擇 1 到 100 個檔案。" });
      return;
    }
    const names = body.files.map((file) => file?.name);
    if (names.some((name) => !safeFileName(name)) || new Set(names).size !== names.length) {
      sendJson(response, 400, { error: "移動清單含有無效或重複檔名，請重新掃描。" });
      return;
    }

    const results = [];
    for (const file of body.files) {
      try {
        results.push(await moveOneFile(file));
      } catch {
        results.push({ name: file.name, status: "failed", message: "移動失敗；來源檔案已保留。" });
      }
    }
    sendJson(response, 200, { results });
    return;
  }

  sendJson(response, 404, { error: "找不到本機路由 API。" });
}

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (pathname.startsWith("/api/")) {
    await handleApi(request, response, pathname);
    return;
  }

  let filePath;
  let contentType = "text/html; charset=utf-8";
  if (pathname === "/") {
    filePath = path.join(root, "workbench.html");
  } else if (pathname === "/favicon.ico") {
    response.writeHead(204).end();
    return;
  } else if (pathname.startsWith("/icons/")) {
    const iconName = pathname.slice("/icons/".length);
    if (!iconNames.has(iconName)) {
      response.writeHead(404).end();
      return;
    }
    filePath = path.join(root, "node_modules", "lucide-static", "icons", `${iconName}.svg`);
    contentType = "image/svg+xml; charset=utf-8";
  } else {
    response.writeHead(404).end("Not found");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(503).end("Dependencies are not installed yet. Run npm install.");
      return;
    }
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(content);
  });
});

const port = Number(process.env.PORT || 4173);
server.listen(port, "127.0.0.1", () => {
  console.log(`File router ready at http://127.0.0.1:${port}`);
});