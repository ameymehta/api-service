"use strict";
export { };

const nconf = require("nconf");
const http = require("http");
const application = require("./application");

// Load configuration
if (process.env.NODE_ENV === "production") {
	nconf.use("file", {
		file: "./config/app.json"
	});
} else {
	nconf.use("file", {
		file: "./config/app-dev.json"
	});
}

const startServer = async () => {
	try {
		let app = await application.create();

		const port = nconf.get("port");
		console.log(`Starting server on port ${port.http}`)

		let listenerPromise = new Promise(async (resolve, reject) => {
			try {
				http.createServer(app).listen(port.http, function () {
					console.log(`Express server listening on HTTP port ${port.http}!`)
					resolve();
				});
			} catch (err) {
				console.error(`Failed to create application. Error= ${err}`)
				reject();
				application.destroy();
			}
		});
		await listenerPromise;
	}
	catch (err) {
		console.error(`Failed to create application. Error= ${err}`)
		application.destroy();
	}
}
startServer();