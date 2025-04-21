import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "node:path";
import { WebSocketServer } from "ws";

// 添加WebSocket服务器实例
let wss: WebSocketServer | null = null;
let isWSServerRunning = false;

// 添加类型声明
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

// 初始化WebSocket服务器
const initWebSocketServer = (port = 8081) => {
  try {
    wss = new WebSocketServer({ port });
    isWSServerRunning = true;

    wss.on("connection", (ws) => {
      console.log("WebSocket客户端已连接");
      ws.send(JSON.stringify({ code: 0, message: "客户端已经成功连接啦", clientLink: '222' }));

      ws.on("message", (message) => {
        console.log("收到消息11:", message.toString());
        ws.send("收到回复啦");
        if (message.toString() === "check-websocket-connection") {
          console.log("发送消息:");
          ws.send("hahahah");
        }
      });

      ws.on("close", () => {
        console.log("WebSocket客户端已断开连接");
      });

      ws.on("check-websocket-connection", (data) => {
        console.log("收到消息22:", data.toString());
        ws.send("hahahah");
      });
    });

    wss.on("error", (error) => {
      console.error("WebSocket服务器错误:", error);
      isWSServerRunning = false;
    });

    console.log(`WebSocket服务器已启动，监听端口 ${port}`);
    return true;
  } catch (error) {
    console.error("启动WebSocket服务器失败:", error);
    isWSServerRunning = false;
    return false;
  }
};

// 添加IPC处理程序检查WebSocket服务器状态
ipcMain.handle("check-websocket-connection", () => {
  return {
    isRunning: isWSServerRunning,
    clientsCount: wss ? wss.clients.size : 0,
  };
});

// 设置请求监听
const setupWebRequestListener = (win: BrowserWindow) => {
  const webviewSession = session.fromPartition("persist:webcache");

  // 监听所有请求
  webviewSession.webRequest.onBeforeRequest((details, callback) => {
    win.webContents.send("request-captured", {
      url: details.url,
      method: details.method,
      type: details.resourceType,
      timestamp: new Date().toISOString(),
    });
    callback({});
  });

  // 监听请求完成
  webviewSession.webRequest.onCompleted((details) => {
    win.webContents.send("request-completed", {
      url: details.url,
      statusCode: details.statusCode,
      timestamp: new Date().toISOString(),
    });
  });
};

// 处理清除缓存的请求
ipcMain.handle("clear-cache", async () => {
  try {
    const webviewSession = session.fromPartition("persist:webcache");
    await Promise.all([
      webviewSession.clearCache(),
      webviewSession.clearStorageData({
        storages: [
          "cookies",
          "filesystem",
          "indexdb",
          "localstorage",
          "shadercache",
          "websql",
          "serviceworkers",
          "cachestorage",
        ],
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("清除缓存失败:", error);
    return { success: false, error: error.message };
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      webSecurity: false,
    },
  });

  // 设置请求监听
  setupWebRequestListener(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  // 启动WebSocket服务器
  initWebSocketServer();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  // 关闭WebSocket服务器
  if (wss) {
    wss.close();
    wss = null;
    isWSServerRunning = false;
    console.log("WebSocket服务器已关闭");
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
