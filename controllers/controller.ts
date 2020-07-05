"use strict";
declare var require: any
declare var module: any
export { };

const express = require("express");
const rp = require('request-promise-native');
const errorUtil = require("../utils/error-util");
const auth = require("../auth/authentication").Authenticate;
const constants = require("../constants");
const responseUtil = require("../utils/response-util");
const { LogQuarterlyActivities } = require("./activity-logger")


// Private Methods ------------------------------------------------------------>


/**
 * Handles an HTTP GET on /login
 * 
 * @param {Object} req
 * @param {Object} res
 * 
 * @returns {Object}
 */
const _login = async (req: any, res: any) => {
	try {
		// https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22942C&redirect_uri=
		const firbitAuthUrl = constants.AUTHORIZE_URI +
			'?response_type=' + constants.RESPONSE_TYPE +
			'&client_id=' + constants.CLIENT_ID +
			'&redirect_uri=' + constants.REDIRECT_URI +
			'&scope=' + constants.SCOPE;
		const encodedFitbitUrl = encodeURI(firbitAuthUrl);
		console.log('ECODED_URI: ' + encodedFitbitUrl);
		// res.redirect(encodedFitbitUrl);
		res.writeHead(301, {
			Location: encodedFitbitUrl,
		});
		res.end();
	} catch (err) {
		console.error(err);
		errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "Failed to login", res, req);
	}
}

/**
 * Handles an HTTP GET on /redirect
 * 
 * @param {Object} req
 * @param {Object} res
 * 
 * @returns {Object}
 */
const _redirect = async (req: any, res: any) => {
	try {
		// Extract Code
		const code = req.query.code;
		console.log('Code: ' + code);
		// Token Request Call
		const grant_type = "authorization_code";
		const tokenRequestBody = "client_id=" + constants.CLIENT_ID +
			"&grant_type=authorization_code&redirect_uri=" + constants.REDIRECT_URI +
			"&code=" + code;
		console.log("tokenRequestBody: " + tokenRequestBody);
		const clientIdSecret = constants.CLIENT_ID + ':' + constants.CLIENT_SECRET;
		const authString = "Basic " + Buffer.from(clientIdSecret).toString('base64')
		console.log("Auth String: " + authString);
		const response = await rp({
			method: 'POST',
			url: constants.TOKEN_URI,
			body: tokenRequestBody,
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
				"Authorization": authString,
			},
			simple: true, // rejects non-200 status codes
		});
		const { access_token, user_id } = JSON.parse(response);
		console.log("access_token: " + access_token);
		console.log("user_id: " + user_id);
		LogQuarterlyActivities(access_token);
		res.redirect('http://localhost:8088/web/result.html');
	} catch (err) {
		console.error('Error: ' + err);
		errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "Failed to redirect", res, req);
	}
}

/**
 * Handles an HTTP GET on /objects
 * 
 * @param {Object} req
 * @param {Object} res
 * 
 * @returns {Object}
 */
const _listAllObjects = async (req: any, res: any) => {
	try {
		const response = responseUtil.handleResponse(constants.HTTP_STATUS_OK, {});
		res.status(response.status);
		res.json(response.body);
	} catch (err) {
		errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "Failed to retrieve the list of objects", res, req);
	}
}

/**
 * Handles an HTTP POST on /objects
 * 
 * @param {object} req 
 * @param {object} res 
 * 
 * @returns {Object} 
 */
const _createObject = async (req: any, res: any) => {
	try {
		const response = responseUtil.handleResponse(constants.HTTP_STATUS_ACCEPTED, {});
		res.status(response.status);
		res.json(response.body);
	}
	catch (err) {
		return errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "Failed to create new object", res, req);
	}
}

/**
 * Handles an HTTP DELETE on /objects/{objecttName}
 * 
 * @param {Object} req 
 * @param {Object} res
 */
const _deleteObjectByName = async (req: any, res: any) => {
	//Getting object name from path param
	const { objectName } = req.params;
	try {
		const response = responseUtil.handleResponse(constants.HTTP_STATUS_ACCEPTED, {});
		res.status(response.status);
		res.json(response.body);
	} catch (err) {
		return errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, `Error terminating ${err}`, res, req);
	}
}

// Public exports ------------------------------------------------------------->
const router = express.Router({
	caseSensitive: true,
	mergeParams: true
});

// Login
router.get("/login", auth, _login);
// Redirect
router.get("/redirect", auth, _redirect);

// Get all objects
router.get("/objects", auth, _listAllObjects);
// Create new object
router.post("/objects", auth, _createObject);
// Delete an object
router.delete("/objects/:objecttName", auth, _deleteObjectByName);

module.exports = router;