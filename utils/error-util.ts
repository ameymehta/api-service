"use strict";
export {};

// Private Methods ------------------------------------------------------------>

const _errorContainer = (model: { code: any; message: any; }) => {
	return Object.assign({}, {
		errors: [
			model
		]
	});
}

/**
 * @function _handleError
 * A utility function to construct an error object with the provided info and
 * respond to the user accordingly.
 *
 * @param  {number} errCode - Error code.
 * @param  {string} errMsg - Error message.
 * @param  {object} res - Response.
 * @param  {object} req - Request object.
 */
const _handleError = (errCode: any, errMsg: any, res: { status: (arg0: any) => void; json: (arg0: { errors: any[]; }) => void; }, req: any) => {
	var errObj = _constructErrObj(errCode, errMsg, req);
	res.status(errCode);
	res.json(errObj);
}

/**
 * @function _constructErrObj
 * A utility function to construct an error object.
 *
 * @param  {number} code - Error code.
 * @param  {string} message - Error message
 * @param  {object} req - Request object
 */
const _constructErrObj = (code: any, message: any, req: any) => {
	const error = {code, message};
	var errObj = _errorContainer(error);
	console.error(JSON.stringify(errObj))
	return errObj;
}

/**
 * @function _customErrObj
 * A utility function to construct an error object.
 *
 * @param  {string} statusCode - Error code.
 * @param  {string} message - Error message
 */
const _customErrObj = (statusCode: any, message: any) => {
	const error = {statusCode, message};
	console.error(JSON.stringify(error))
	return error;
}

// Public Methods ------------------------------------------------------------->

module.exports.errorContainer = _errorContainer;
module.exports.handleError = _handleError;
module.exports.constructErrObj = _constructErrObj;
module.exports.customErrObj = _customErrObj;