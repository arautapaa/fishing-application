import ApiGateWayFactory from 'aws-api-gateway-client';
import { getCredentials } from './Authentication'; 
import * as EnvironmentConfiguration from '../../environment';

export function fetchData(path) {
	return new Promise((resolve, reject) => {
		sendRequest(path, 'GET', {}).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
		})
	});
  	
}

export function sendRequest(path, method, body) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = EnvironmentConfiguration.API_GATEWAY_URL;

		const credentials = getCredentials();

		let okResponse = false;

		if(EnvironmentConfiguration.OFFLINE) {
			let bodyObj = body;

			if(Object.keys(bodyObj).length == 0) {
				bodyObj = null;
			}

			if(bodyObj != null) {
				bodyObj = JSON.stringify(bodyObj)
			} 

			fetch(API_GATEWAY_URL + path, { 
				body : bodyObj,
				method : method,
				headers: {
		            "Content-Type": "application/json; charset=utf-8"
		        }
			}).then((response) => {
				console.log(response);
				okResponse = response.ok;
				return response.json();
			}).catch(error => reject(JSON.stringify(error)))

			.then((response) => {
				if(!okResponse) {
					reject(response);
				} else {
					resolve(response) 
				}
			});
		} else {

			const apigClientFactory = ApiGateWayFactory;

			const apigClient = apigClientFactory.newClient({
			    invokeUrl: API_GATEWAY_URL, // REQUIRED
			    accessKey: credentials.accessKeyId, // REQUIRED
			    secretKey: credentials.secretAccessKey, // REQUIRED
			    sessionToken: credentials.sessionToken, //OPTIONAL: If you are using temporary credentials you must include the session token
			    region: 'eu-central-1', // REQUIRED: The region where the API is deployed.
			    systemClockOffset: 0, // OPTIONAL: An offset value in milliseconds to apply to signing time
			    retries: 4, // OPTIONAL: Number of times to retry before failing. Uses axon-retry plugin.
			    retryCondition: (err) => { // OPTIONAL: Callback to further control if request should be retried.  Uses axon-retry plugin.
			      return err.response && err.response.status === 500;
			    }
			});
	  	
		  	apigClient.invokeApi({}, path, method, {}, body).then((response) => {
		  		resolve(response.data);
		  	}).catch((error) => {
		  		reject(error);
		  	});
		}
	})
}

export function fetchEntryData() {

	const self = this;

    return new Promise((resolve, reject) => {
    	Promise.all([fetchData('/places'), fetchData('/selections')]).then((execution) => {
    		resolve({
    			places : execution[0],
    			selections : execution[1]
    		})
    	}).catch((error) => {
    		reject(error);
    	})
    });
}