import io from "socket.io-client";
// Initialize Socket.io.
// This is connecting to the main process of Electron and then to Max but alternatively you could choose
// to use some other ways of commmunication.
const socket = io("http://localhost:7878").connect();

socket.on("connect", () => {
	console.log("Connected to Max 8");
	
	socket.on("number", { number } );
		
		
});

window.addEventListener("DOMContentLoaded", () => {
	console.log("Hello Electron in the console!");
});
