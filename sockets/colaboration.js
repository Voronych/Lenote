const expressSession = require("express-session");
const keys = require("../config/keys");
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const mongoStore = new (require("connect-mongo")(expressSession))({
	url: keys.mongodb.dbURI
});

exports = module.exports = function(io) {
	//Access passport.js user information from a socket.io connection.

	io.use(
		passportSocketIo.authorize({
			cookieParser: cookieParser, // the same middleware you registrer in express
			secret: keys.session.secret, // the session_secret to parse the cookie
			store: mongoStore // we NEED to use a sessionstore. no memorystore please
		})
	);

	let anchors = {};
	let names = {};
	io.on("connection", client => {
		const id = client.id;

		let roomName = "";
		client.on("joinRoom", room => {
			roomName = room;
			client.join(room);

			anchors = client.adapter.rooms[roomName].anchors
				? client.adapter.rooms[roomName].anchors
				: (client.adapter.rooms[roomName].anchors = {});
			names = client.adapter.rooms[roomName].names
				? client.adapter.rooms[roomName].names
				: (client.adapter.rooms[roomName].names = {});

			names[id] = client.request.user.photoURI;
			anchors[id] = [0, 0];
			io.to(roomName).emit("initialize", { anchors, names });
			io.to(roomName).emit("id-join", {
				id,
				name: names[id],
				anchor: anchors[id]
			});
		});
		// send client its id and anchor and names obj

		client.on("anchor-update", msg => {
			// set anchors[id]
			anchors[id] = msg;
			io.to(roomName).emit("anchor-update", { id, anchor: anchors[id] });
		});

		// Remove id info and update clients
		// TODO: This doesn't seem to always get called
		// Mashing resfresh on a page seems to leave lingering
		// connections that eventually close
		client.on("disconnect", () => {
			delete names[id];
			delete anchors[id];
			io.to(roomName).emit("id-left", { id });
		});
	});
};
