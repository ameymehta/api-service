"use strict";
export {};

// TODO: REVISIT: Scan only for tags? Also, should be in a common shared library provided by the security team.
// const xssRegex = /<.+?>/g;
const xssRegex = /</;

// Private Methods ------------------------------------------------------------>

/**
 * Scans the specified String ("text") for insecure content (XSS).
 *
 * @param  {string} text - The String to scan.
 *
 * @returns {boolean} - 'false' if 'text' contains insecure content; otherwise, 'true'.
 */
const _isSecureText = (text: string): boolean => {
	if (xssRegex.test(text)) {
		return false;
	}
	return true;
}

// Public Methods ------------------------------------------------------------->

module.exports.isSecureText = _isSecureText;