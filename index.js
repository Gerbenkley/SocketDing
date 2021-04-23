
// This file is the entrypoint for the Max patch.
// When this file is executed via `node.script start` in the Max patch,
// this program will launch an Electron app as a child process, and connect to it via socket.io.


const MaxAPI   = require("max-api");
const io       = require("socket.io")();
const electron = require("electron");
const proc     = require("child_process");
const child    = proc.spawn(electron, ["./electron"]);

let number = 1;

io.on("connection", (socket) => {

	console.log("Socket is connected with Electron App");
	
	socket.emit(number);
	
	socket.on("number", ({ number }) => {
		console.log("number: ", number);
		MaxAPI.outlet(number);
	});

});



// Dit krijgt een berichtje binnen van Max aka Ableton
// Ik verander een global variable met dat getal
const MESSAGE_TYPES = MaxAPI.MESSAGE_TYPES;

MaxAPI.addHandler(MESSAGE_TYPES.NUMBER, async (num) => {
	
	number = num;
	await MaxAPI.outlet("handler", `received number: ${number}`);
		
});



io.listen(7878);

// This will ensure that when this parent process is killed in maxpat (either by `node.script stop` or Max is shutdown for some reason),
// it will terminate the child process, the Electron app.
process.on("exit", () => {
	child.kill();
});
