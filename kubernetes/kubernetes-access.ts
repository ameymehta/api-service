"use strict";
export { };
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

/**
 * Get pods in namespace
 * @param {String} namespace Kubernetes Namespace
 */
const _getPods = async (namespace: string) => {
	const pods = await client.api.v1.namespaces(namespace).pods.get()
	return pods;
}

/**
 * Get pod names in namespace
 * @param {String} namespace Kubernetes Namespace
 */
const _getPodNames = async (namespace: string) => {
	let names: any[];
	const pods = await client.api.v1.namespaces(namespace).pods.get()
	if (pods && pods.body && pods.body.items) {
		names = pods.body.items.map((pod: any) => {
			return pod.metadata.name;
		});
	}
	return names;
}

/**
 * Get services in namespace
 * @param {String} namespace Kubernetes Namespace
 */
const _getServices = async (namespace: string) => {
	const services = await client.api.v1.namespaces(namespace).service.get()
	return services;
}

/**
 * Get app host from service
 * @param {String} namespace Kubernetes Namespace
 */
const _getAppHost = async (namespace: string) => {
	let host = '';
	try {
		const services = await client.api.v1.namespaces(namespace).service.get()
		services.body.items.forEach((svc: any) => {
			if (svc.metadata.name == 'webapp') {
				host = svc.status.loadBalancer.ingress[0].hostname;
			}
		});
		console.log('host ' + host);
		return host;
	} catch (err) {
		console.log(err);
		return host;
	}
}

// Public Interface ------------------------------------------------------------->

module.exports.GetNamespace = _getNamespace;
module.exports.GetPods = _getPods;
module.exports.GetPodNames = _getPodNames;
module.exports.GetServices = _getServices;
module.exports.GetAppHost = _getAppHost;
