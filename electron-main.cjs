const { app, BrowserWindow } = require("electron");
const { spawn } = require("node:child_process");
const http = require("node:http");
const path = require("node:path");

const appUrl = "http://127.0.0.1:4173/";
const appOrigin = new URL(appUrl).origin;
let mainWindow;
let ownedServer;

function probeServer() {
  return new Promise((resolve) => {
    const request = http.get(appOrigin, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });
    request.setTimeout(700, () => request.destroy());
    request.on("error", () => resolve(false));
  });
}

async function ensureServer() {
  if (await probeServer()) return;

  const nodeExecutable = process.env.npm_node_execpath || "node";
  ownedServer = spawn(nodeExecutable, ["--use-env-proxy", "--use-system-ca", path.join(__dirname, "local-server.cjs")], {
    cwd: __dirname,
    windowsHide: true,
    stdio: "ignore",
  });

  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    if (await probeServer()) return;
    if (ownedServer.exitCode !== null) throw new Error("本機檔案整理服務無法啟動。");
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("等待本機檔案整理服務逾時。");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 760,
    minHeight: 620,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (new URL(url).origin !== appOrigin) event.preventDefault();
  });
  mainWindow.on("closed", () => { mainWindow = null; });
  void mainWindow.loadURL(appUrl);
}

app.whenReady().then(async () => {
  try {
    await ensureServer();
    createWindow();
  } catch (error) {
    dialog.showErrorBox("檔案整理器無法啟動", error.message);
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("before-quit", () => {
  if (ownedServer && ownedServer.exitCode === null) ownedServer.kill();
});