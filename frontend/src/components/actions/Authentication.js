import AWS  from 'aws-sdk';
import Cookies from 'universal-cookie';
import { fetchData } from './DraughtServices';

export function authenticate(id_token) {
	return new Promise((resolve, reject) => {
		AWS.config.region = process.env.AWS_REGION;	

		const credentials = new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
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
		fetchData('/user/groups').then((response) => {
			console.log(response);
			resolve(response);
		}).catch((error) => {
			reject(error);
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

export function setNoUserGroupCookie() {
	const cookies = new Cookies();
	cookies.set('hasNoUserGroup', true, { expires : 900 });
}

export function hasUserGroup() {
	const cookies = new Cookies();
	return cookies.get('hasNoUserGroup');
}