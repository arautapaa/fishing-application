import ApiGateWayFactory from 'aws-api-gateway-client';
import { getCredentials } from './Authentication'; 

export function fetchData(path) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = getCredentials();

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

		console.log(apigClient);
	  	
	  	apigClient.invokeApi({}, path, 'GET', {}, null).then((response) => {
	  		resolve(response);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	})
  	
}

export function updateData(path, method, body) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = getCredentials();

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

		console.log(apigClient);
	  	
	  	apigClient.invokeApi({}, path, method, {}, body).then((response) => {
	  		resolve(response);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	})
}

export function fetchEntryData() {

	const self = this;

    return new Promise((resolve, reject) => {
    	Promise.all([fetchData('/places'), fetchData('/selections')]).then((execution) => {
    		resolve({
    			places : execution[0].data,
    			selections : execution[1].data
    		})
    	}).catch((error) => {
    		reject(error);
    	})
    });
}

export function saveDraught(data) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = getCredentials();
		
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

		console.log(apigClient);
	  	
	  	apigClient.invokeApi({}, '/draughts', 'POST', {}, data).then((response) => {
	  		resolve(response);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	})
}