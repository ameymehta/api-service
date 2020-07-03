"use strict";
export {};

// Private Methods ------------------------------------------------------------>

/**
 * Wraps status, body, and response to be passed between layers for better resp handling
 *  respCode: Response code ex. 200, 201, etc.
 */
const _handleResponse = (responseCode: any, body: any) => {
    return Object.assign({}, {
        status: responseCode,
        body: body
    });
}

// Public Methods ------------------------------------------------------------->
module.exports.handleResponse = _handleResponse;