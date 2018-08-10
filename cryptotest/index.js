const crypto = require('crypto');
const cryptoKey = process.env.INVITATION_CRYPTO_KEY || 's3Cr#tS#cR3tK€y';
console.log(cryptoKey);

const validToLimit = process.env.VALID_DAYS || 10;
const algorithm = 'aes-256-ctr';
const uuidv4 = require('uuid/v4');

const helperFunctions = {
	getKeys : function(string, amount) {
		const self = this;

		return new Promise((resolve, reject) => {
			const keys = [];
			let processed = 0;

			for(let i = 0; i < amount; i++) {
				this.generateKey(string).then((key) => {
					keys.push(key);

					if(++processed == amount) {
						resolve(keys);
					}
				});
			}
		});
	},

	encryptValue : function(value) {
		return new Promise((resolve, reject) => {
			const cipher = crypto.createCipher(algorithm,cryptoKey);
			let crypted = cipher.update(value,'utf8','hex');
			crypted += cipher.final('hex');
			resolve(crypted);
		});

	},

	decryptValue : function(value) {
		return new Promise((resolve, reject) => {
			const decipher = crypto.createDecipher(algorithm,cryptoKey);
			let dec = decipher.update(value,'hex','utf8');
			dec += decipher.final('utf8');
			resolve(dec);
		}) ;

	},

	generateKey : function(string) {
		const self = this;

		return new Promise((resolve, reject) => {
			self.encryptValue(string + ":" + uuidv4()).then((response) => {
				resolve(response);
			})
		});
	}
};



helperFunctions.getKeys("asdasd", 10).then((keys) => {
	keys.forEach((item) => {
		helperFunctions.decryptValue(item).then((value) => {
			console.log(item + " => " + value);
		});
	});
});

//module.exports = helperFunctions;