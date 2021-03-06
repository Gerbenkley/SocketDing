
// Because this file is specified as the `main` in package.json
// this file will be the entry point for Electron App
// when `npm start` is called.


const { app, BrowserWindow } = require("electron");

app.on("ready", () => {

	console.log("Electron has started");

	// Launch a window and load index.html
	let window = new BrowserWindow({width: 75, height: 75, frame: false});
	window.setResizable(false);
	window.setAlwaysOnTop(true);
	window.loadFile("./src/index.html");

	window.on("closed", () => {
		window = null;
	});


	// For Development Only
	if (process.env.DEBUG) {
		// This will not be open when it's called in Max patch,
		// because the environment variable DEBUG will not be provided.
		// c.f. See ../../index.js, where it calls child_process.spawn to invoke Electron
		window.webContents.openDevTools();
	}

});

app.on("window-all-closed", function () {

	if (process.platform !== "darwin") {
		app.quit();
	}

});


