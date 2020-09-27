"use strict";
{
	const express = require("express");
	const nconf = require("nconf");
	const bodyParser = require("body-parser");
	const sformat = require("string-format");
	const compression = require("compression");
	const constants = require("./constants");
	const k8s = require("./kubernetes/kubernetes-access");
	const fs = require("fs");

	// Swagger API explorer
	const swaggerUi = require("swagger-ui-express");

	// API Controllers
	const controller = require("./controllers/controller");

	// Private Methods ------------------------------------------------------------>
	const _destroy = () => {
		console.error('Process terminated.')
		process.exit(constants.FAILURE_EXIT_CODE);
	}

	const _handleUncaughtException = (err: any) => {
		console.error(`Uncaught exception encountered: ${err}`)
		// Application is in an undefined state. Destroy it.
		_destroy();
	}

	const _create = () => {
		return new Promise(async (resolve, reject) => {
			try {
				// Globals
				var config = nconf.get("config");

				// Handle uncaught exceptions
				process.on("uncaughtException", _handleUncaughtException);
				process.on("unhandledRejection", _handleUncaughtException);

				// App Details
				console.log(`URI: ${sformat(config.publicUri)}`);

				// Application Settings
				var app = express();
				app.disable('x-powered-by')

				// See: http://expressjs.com/en/guide/behind-proxies.html
				app.set("trust proxy", 1);

				//Health check endpoint
				app.get(constants.API_BASEPATH + constants.HEALTH_CHECK_API, function (req: any, res: any) {
					res.json({ status: 'UP' });
				});

				// App Routers
				const routerOptions = {
					caseSensitive: true,
					mergeParams: true
				};
				const router = express.Router(routerOptions);

				// Add app host to swagger
				const swaggerDefinition = JSON.parse(fs.readFileSync('./api/openapi-v3.json', 'utf8'));
				const host = await k8s.GetAppHost('webapp')
				let url = 'http://' + host + '/api/';
				swaggerDefinition.servers = [];
				swaggerDefinition.servers.push({ url });

				// Global Middleware
				app.use(compression());
				app.use(constants.BASEPATH, router);
				app.use(constants.API_DOCS_BASEPATH, swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

				// Router Configuration ------------------------------------------------>

				// App Middleware
				router.use(bodyParser.json());
				router.use(bodyParser.urlencoded({
					extended: false
				}));

				// App Routes - API
				router.use(constants.API_BASEPATH, controller);
				resolve(app);
			} catch (err) {
				reject(err);
			}
		});
	}

	// Public Methods ------------------------------------------------------------->
	module.exports.create = _create;
	module.exports.destroy = _destroy;
}