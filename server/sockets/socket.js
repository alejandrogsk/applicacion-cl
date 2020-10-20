const { io } = require("../server");
const { TiketControl } = require("../classes/tiket-control");

const tiketControl = new TiketControl();

io.on("connection", client => {
	client.on("siguienteTicket", (data, callback) => {
		let siguiente = tiketControl.siguienteTiket();

		console.log(siguiente);

		callback(siguiente);
	});

	client.emit("estadoActual", {
		estadoActual: tiketControl.getUltimoTicket(),
		ultimos4: tiketControl.getUltimos4(),
	});

	client.on("atenderTicket", (data, callback) => {
		if (!data.escritorio) {
			return callback({
				err: true,
				msg: "No hay ticket",
			});
		}

		let atenderTicket = tiketControl.atenderTicket(data.escritorio);

		callback(atenderTicket);

		// actualizar / notificar cambios en los ULTIMOS 4
		client.broadcast.emit("ultimos4", {
			ultimos4: tiketControl.getUltimos4(),
		});
	});
});
