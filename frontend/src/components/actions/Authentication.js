import AWS  from 'aws-sdk';
import Cookies from 'universal-cookie';
import { fetchData } from './DraughtServices';
import * as ENV from '../../environment';

export function authenticate(id_token) {
	return new Promise((resolve, reject) => {
		AWS.config.region = ENV.AWS_REGION;	

		const credentials = new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: ENV.COGNITO_IDENTITY_POOL_ID,
			Logins : {
				'accounts.google.com' : id_token
			}
		});

		credentials.get(function() {
			const cookies = new Cookies();

			if(!credentials.expired) {

				cookies.set('accessKeyId_v2', credentials.accessKeyId, { expires : credentials.expireTime });
				cookies.set('secretAccessKey_v2', credentials.secretAccessKey, { expires : credentials.expireTime });
				cookies.set('sessionToken_v2', credentials.sessionToken, { expires : credentials.expireTime });

				resolve(credentials);
			} else {
				authenticate(id_token).then((response) => {
					resolve(response);
				});
			}
		});
	});
}

export function getAWSCredentials() {
	return new Promise((resolve, reject) => {
		AWS.config.region = ENV.AWS_REGION;

		resolve(AWS.config.credentials)

	});
}

export function logout() {

	return new Promise((resolve, reject) => {

		const cookies = new Cookies();
		cookies.remove('accessKeyId_v2');
		cookies.remove('secretAccessKey_v2');
		cookies.remove('sessionToken_v2');	

		getAWSCredentials().then((credentials) => {
			console.log(credentials)
		})

		resolve({ loggedOut : true })
	})
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
	const authCookie = cookies.get('accessKeyId_v2');
	const secret = cookies.get('secretAccessKey_v2');
	const session = cookies.get('sessionToken_v2');

	return authCookie && secret && session;
}

export function getCredentials() {
	const cookies = new Cookies();

	return {
		'accessKeyId' : cookies.get('accessKeyId_v2'),
		'secretAccessKey' : cookies.get('secretAccessKey_v2'),
		'sessionToken' : cookies.get('sessionToken_v2')
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