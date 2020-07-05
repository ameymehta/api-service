"use strict";

const _const = (name: string, value: any) => {
	Object.defineProperty(module.exports, name, {
		"value": value,
		"enumerable": true,
		"writable": false
	});
}

// Application Constants
_const("FAILURE_EXIT_CODE", 1);
_const("BASEPATH", "/");
_const("API_BASEPATH", "/api");
_const("API_DOCS_BASEPATH", "/api-docs");
_const("HEALTH_CHECK_API", "/health");

// HTTP Constants
_const("HTTP_STATUS_OK", 200);
_const("HTTP_STATUS_CREATED", 201);
_const("HTTP_STATUS_ACCEPTED", 202);
_const("HTTP_STATUS_NO_CONTENT", 204);
_const("HTTP_STATUS_REDIRECT", 302);
_const("HTTP_STATUS_BAD_REQUEST", 400);
_const("HTTP_STATUS_UNAUTHORIZED", 401);
_const("HTTP_STATUS_FORBIDDEN", 403);
_const("HTTP_STATUS_NOT_FOUND", 404);
_const("HTTP_STATUS_METHOD_NOT_ALLOWED", 405);
_const("HTTP_STATUS_CONFLICT", 409);
_const("HTTP_STATUS_INTERNAL_SERVER_ERROR", 500);
_const("HTTP_STATUS_SEE_OTHER", 303);
_const("HTTP_PORT", 80);
_const("HTTPS_PORT", 443);

// Error Constants
_const("ERROR_INSECURE_VALUE", "The value of the '{key}' field cannot contain any unescaped left " +
"angle bracket ('<') characters or HTML markup: '{value}'.");

// Logging Constants
_const("LOG_LEVEL_DEBUG", "debug");
_const("LOG_LEVEL_INFO", "info");
_const("LOG_LEVEL_ERROR", "error");

// Fitbit
_const("AUTHORIZE_URI", "https://www.fitbit.com/oauth2/authorize");
_const("TOKEN_URI", "https://api.fitbit.com/oauth2/token");
_const("CLIENT_ID", "");
_const("CLIENT_SECRET", "");
_const("RESPONSE_TYPE", "code");
_const("SCOPE", "activity");
_const("REDIRECT_URI", "http://localhost:8088/api/redirect");


// Calendar
_const("START_DATE", "2020-05-01");
_const("END_DATE", "2020-05-30");
_const("START_TIME", "9%3A20");