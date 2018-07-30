const AWS = require('aws-sdk');

export function authenticate(id_token) {
	return new Promise((reject, resolve) => {
		AWS.config.region = 'eu-central-1';	

		const credentials = new AWS.CognitoIdentityCredentials({
		    IdentityPoolId: environment.identityPoolId,
			Logins : {
				'accounts.google.com' : id_token
			}
		});

		credentials.get(function() {
			resolve(credentials);
		});
	});
}