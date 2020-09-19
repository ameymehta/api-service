"use strict";
export {};
const Client = require('kubernetes-client').Client;
const client = new Client({ version: '1.13' });

// Private Implementations ------------------------------------------------------------>

// Namespace functions
/**
 * Get Kubernetes namespace
 * @param {String} namespace Kubernetes Namespace
 */
const _getNamespace = (namespace: string) => {
	return client.api.v1.namespaces(namespace).get();
}

// Pod Functions
/**
 * Get pods in namespace that match the label selector
 * @param {String} namespace Kubernetes Namespace
 */
const _getPods = async (namespace: string) => {
	const pods = await client.api.v1.namespaces(namespace).pods.get()
	return pods;
}

// Public Interface ------------------------------------------------------------->
// Namespace Functions
module.exports.GetNamespace = _getNamespace;
// Pod Functions
module.exports.GetPods = _getPods;
