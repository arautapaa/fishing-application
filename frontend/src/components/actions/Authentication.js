import AWS  from 'aws-sdk';
import Cookies from 'universal-cookie';
import { fetchData } from './DraughtServices';

export function authenticate(id_token) {
	return new Promise((resolve, reject) => {
		AWS.config.region = 'eu-central-1';	

		const credentials = new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: 'eu-central-1:d12da3ad-b046-4694-890b-16852ac4d39e',
			Logins : {
				'accounts.google.com' : id_token
			}
		});

		credentials.get(function() {
			const cookies = new Cookies();

			cookies.set('accessKeyId', credentials.accessKeyId, { expires : credentials.expireTime });
			cookies.set('secretAccessKey', credentials.secretAccessKey, { expires : credentials.expireTime });
			cookies.set('sessionToken', credentials.sessionToken, { expires : credentials.expireTime });

			resolve(credentials);
		});
	});
}

export function getUser() {
	return new Promise((resolve, reject) => {
		fetchData('/user/groups', (response) => {
			resolve(response.data);
		});
	});
}

export function isLoggedIn() {
	const cookies = new Cookies();
	const authCookie = cookies.get('accessKeyId');
	const secret = cookies.get('secretAccessKey');
	const session = cookies.get('sessionToken');

	return authCookie && secret && session;
}

export function getCredentials() {
	const cookies = new Cookies();

	return {
		'accessKeyId' : cookies.get('accessKeyId'),
		'secretAccessKey' : cookies.get('secretAccessKey'),
		'sessionToken' : cookies.get('sessionToken')
	}
}