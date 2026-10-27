const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const iconNames = new Set([
  "arrow-right",
  "check",
  "chevron-left",
  "chevron-right",
  "circle-alert",
  "circle-check",
  "clock",
  "download",
  "file-text",
  "folder-open",
  "hard-drive",
  "history",
  "inbox",
  "list-filter",
  "move-right",
  "plus",
  "scan-search",
  "search",
  "settings-2",
  "triangle-alert",
  "undo-2",
  "x",
]);

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  let filePath;
  let contentType = "text/html; charset=utf-8";

  if (pathname === "/" || pathname === "/prototype.html") {
    filePath = path.join(root, "prototype.html");
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
  console.log(`Prototype ready at http://127.0.0.1:${port}`);
});