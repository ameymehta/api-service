"use strict";
declare var require: any
declare var module: any
export { };

const express = require("express");
const errorUtil = require("../utils/error-util");
const auth = require("../auth/authentication").Authenticate;
const constants = require("../constants");
const responseUtil = require("../utils/response-util");
const k8s = require("../kubernetes/kubernetes-access");


// Private Methods ------------------------------------------------------------>

/**
 * Handles an HTTP GET on /objects
 * 
 * @param {Object} req
 * @param {Object} res
 * 
 * @returns {Object}
 */
const _listPods = async (req: any, res: any) => {
	try {
		console.log('Listing Pods in default namespace');
		const podNames = await k8s.GetPodNames("webapp");
		console.log(podNames);
		const response = responseUtil.handleResponse(constants.HTTP_STATUS_OK, podNames);
		res.status(response.status);
		res.json(response.body);
	} catch (err) {
		errorUtil.handleError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, "Failed to retrieve the list of objects", res, req);
	}
}

// Public exports ------------------------------------------------------------->
const router = express.Router({
	caseSensitive: true,
	mergeParams: true
});

//Get all objects
router.get("/pods", auth, _listPods);

module.exports = router;