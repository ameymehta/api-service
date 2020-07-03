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


// Private Methods ------------------------------------------------------------>

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

//Get all objects
router.get("/objects", auth, _listAllObjects);
//Create new object
router.post("/objects", auth, _createObject);
//Delete an object
router.delete("/objects/:objecttName", auth, _deleteObjectByName);

module.exports = router;