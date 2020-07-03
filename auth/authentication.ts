"use strict";
export { };
const constants = require("../constants");
const errorUtil = require("../utils/error-util");

// Private Methods ------------------------------------------------------------>
//
/**
 *  Token based authentication
 */
const _authenticate = async (req: any, res: Object, next: () => void) => {
	try {
		next();
	} catch (err) {
		errorUtil.handleError(constants.HTTP_STATUS_FORBIDDEN, "You are forbidden from making this request", res, req);
	}
}

// Public exports ------------------------------------------------------------->
module.exports.Authenticate = _authenticate;