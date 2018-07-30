var mysql = require('mysql');

var apigClientFactory = require('aws-api-gateway-client').default;
var async = require('async');

function insertDraught(draught) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = {
			accessKeyId : 'ASIAZ4PGT3NQMODN6P4V',
			secretAccessKey : 'PvSOWSjXs3Z7LwcvHkvRe7g4XpVBGhe7eUR0NTK2',
			sessionToken : 'AgoGb3JpZ2luEBQaDGV1LWNlbnRyYWwtMSKAAjYNgHF+obnrGQSMnHp3OEUY25Y+p+Vv+VtuY/yTObvlrcaHhPBf0YXp6w3DZt6w7Z53ZcA8dxhVPP9SPwdDWnTYXoNP0muD6TkeHnXi/DNUvv4mgRiyui23ilSkAQVMOLWrsksQSuTyLb8S89k122+AecDs+BZPmJ9fiz1jtviRwD4XDpglvGWEP5a1G+cQoKjN7Nx7UvF2hXwjkYfewTHdBR+lbeE9EhjjXivDCsGbwG/hig+I7FFaiCk8LjIj3dv5+xxqV7JesWUGNESojn4UDyhc3dXvnkFHVMwLXTarwSA5e0MRkfdFGD29ylvhuGa8SvatDQXRgcrq6Ug+lOwqmQUI6f//////////ARAAGgw2Nzk2MjUzNDk5ODQiDKJO76uQmOOEci4ulSrtBLUcexNROEXroRRyhSCAG53dg6F7pPWfLTkf+ukWCMLSoLSEVTG+PJvovgxX63Wiwdq4MpAtImUrTU9W4ZPdu44hcXkXh1L6OvAnEmWoIFMU5tpm3VIFiNEf9XVKE7PFFgU5NTe9ikd8BlK/S3CKImLgIuwq13ag/MemqeKORxpmGGcieIzSQkDDmEOah22CmhFvDktkoVTzdnyftgrTT9Drp9JQzbrCMDPWqC3oxAkQ8lMgQJyllaXKR4MJSJGsHEzJV5j1IpxmvvnBUsnbuFOVXvKSEG+Rod+kW5bXYcBkZZ4szKlSZj/CY6KcVf/s6ErfWRD9iDPsmcofbSK9TRwC70vl0XD3a3yD12VHSKLJRbe3/0uhGXSmT0qGP6MCwlj4ldLYY/8LaEJHBs7X3jmNcnFiAaRNZ+dADfN+Gu5ijD2n5ZPW48ctZQ+h0ff70QPMnMG76/Fdn3WrMoJf3lRect0NGE1lJLGRYdH/8xtJ9VJJ8N7trbSb/sM6JbUqMDEc7zuGLph8k8GwWwolH5tQCdkyfnRilVspq+/vl+erf43bwWGiNLGFsLQLxTLNhfwqAZVyw288WvETtnWhFkxfjo1XPiT2kDqPx7O6ZVRS4eW8uUm9ghVhKBRF5NXvPzE0HEnm2ZNUI+q8aKenqw8gAycCx7HHsV96LiUlE+Qrn0beiJqyWKu2coD+4ZzwOwvqs62dA08L0G1KGEaQNwQYhlNfs1+zUGH3SN7a4gqY3FLO4vmaJ94CPRF4IcPHeSECziUHvIshGKdirkWmgxFWGzZ4bvgu1L7iWHJY6w228OvpJtnYNhKkXHJhqTCG6/XaBQ=='
		}

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

	  	apigClient.invokeApi({}, '/draughts', 'POST', {}, draught).then((response) => {
	  		resolve(response.data);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	});
}

function getPlaces() {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = {
			accessKeyId : 'ASIAZ4PGT3NQKXBPTRNU',
			secretAccessKey : 't5c27LRNknqz/Nqa+yLV2Q4ef2LIH5N7N+EueKGT',
			sessionToken : 'AgoGb3JpZ2luEAcaDGV1LWNlbnRyYWwtMSKAAohKkQ14yw8lOq/SH1IUAj6ZLcPZ0tt16XP+1/wCzWnNRHrmjVV/h8FzmfBEfD9AVzN/hw6hqT45SN7xqnlwHCau9iwkaPl/2qRoN5AW6i8KmtMThuV/UcHt/MGfOYD6oE1/46ak/OziFPbSSHG6urx+Nt165Yv4cwcdHiWzY2uDunC2ipil7zVKp9KxlJFf/ZdRo43tALdx6kW1ylUtPV3VGdTDXvHC6oo0hCjWvXBkRsOTji2WJ1EXOL7Wx8MbGlbWg7F54zeQi3+3vyRI3DR9NFjFRwwBKZ7ruq3unH6EFu3hsPM8TNDoXD/WZ7isQXUaDL3N6ZcwoKieXG1pVNIqmQUI3f//////////ARAAGgw2Nzk2MjUzNDk5ODQiDBgEacouDaoQF5sSDyrtBAY2w/eXV5ULKwcL1wV9qH5qk9RAMXJqmgEIetZfGaFnofzCdUOBT320DjqIQTeCZueCTw9ArpybibhcjuXCPORhSTGqQ3Hal/mofhfpbjqAzvlP78KSuPtT0c+tiWxs67YGY7eOT+HpzNxVEvYRhUUdceYu5tgLIjR0zEntNW2lY2bwZeAp38LzTWAQ+lidVh00jl6+wA7RxiS3btPgh3/ucVE4XPwqTqQ6FCEGy97Z1cXcqHVqMzVuXf/XUm2WXSTVwTsdEFfjCZB0on0cCpaoatkclvLnOV6yTptKoGGWrHgHqDtY7Z/bK7f+ewMDzZ4ycq7cixScY5EgcZ5AiEeZXEk0CqoQAlEiCv2qERw6mywJmnCY8ZTL5aaTkroLw8+l+Oj/l5pyEhsMvi3pBz2TwK7GdKw9AEXIYijko1livpbBOlHUNBnGLAVI1FhGXnaYaUIAn1HmLcuKNKbJfj7Hi11UvL5oxiAD5aqE1Nbysa0y+7LyRhg2/fcXOEjMEl8PQReVFzHbCgmG5we8IeZ98cEoT2wcDuwANQbbTRhUtEVYR3PXKkv7N6iUTkDgMuYpC5cAACWcMySZT8zm3HYVfhEQabtzLRIipwneEVbrxjnag+NHlM/Y77Ep+RPR1BJNoRHp/oHO9N6jxSY8R3zfGzhle4HyqAY/kYTB9dcPx4lsM++hkfKV7YXuJiy10qId5OIRYUpbh4vwMrizHBFA33dHxGS3wdZmgBReJTOodGKKveSkLMOKKseSgOC4VmWm5dbuwD0LZ27ig2cRHBrVmIfvjE/uO3rqZqGbvG41wVm4UGSBVhDbMUQ5yTDhkfPaBQ=='
		}

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
	  	
	  	apigClient.invokeApi({}, '/places', 'GET', {}, null).then((response) => {
	  		resolve(response.data);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	});
}

function insertPlace(place) {
	return new Promise((resolve, reject) => {
		const API_GATEWAY_URL = 'https://t72laihw43.execute-api.eu-central-1.amazonaws.com/dev';

		const credentials = {
			accessKeyId : 'ASIAZ4PGT3NQMODN6P4V',
			secretAccessKey : 'PvSOWSjXs3Z7LwcvHkvRe7g4XpVBGhe7eUR0NTK2',
			sessionToken : 'AgoGb3JpZ2luEBQaDGV1LWNlbnRyYWwtMSKAAjYNgHF+obnrGQSMnHp3OEUY25Y+p+Vv+VtuY/yTObvlrcaHhPBf0YXp6w3DZt6w7Z53ZcA8dxhVPP9SPwdDWnTYXoNP0muD6TkeHnXi/DNUvv4mgRiyui23ilSkAQVMOLWrsksQSuTyLb8S89k122+AecDs+BZPmJ9fiz1jtviRwD4XDpglvGWEP5a1G+cQoKjN7Nx7UvF2hXwjkYfewTHdBR+lbeE9EhjjXivDCsGbwG/hig+I7FFaiCk8LjIj3dv5+xxqV7JesWUGNESojn4UDyhc3dXvnkFHVMwLXTarwSA5e0MRkfdFGD29ylvhuGa8SvatDQXRgcrq6Ug+lOwqmQUI6f//////////ARAAGgw2Nzk2MjUzNDk5ODQiDKJO76uQmOOEci4ulSrtBLUcexNROEXroRRyhSCAG53dg6F7pPWfLTkf+ukWCMLSoLSEVTG+PJvovgxX63Wiwdq4MpAtImUrTU9W4ZPdu44hcXkXh1L6OvAnEmWoIFMU5tpm3VIFiNEf9XVKE7PFFgU5NTe9ikd8BlK/S3CKImLgIuwq13ag/MemqeKORxpmGGcieIzSQkDDmEOah22CmhFvDktkoVTzdnyftgrTT9Drp9JQzbrCMDPWqC3oxAkQ8lMgQJyllaXKR4MJSJGsHEzJV5j1IpxmvvnBUsnbuFOVXvKSEG+Rod+kW5bXYcBkZZ4szKlSZj/CY6KcVf/s6ErfWRD9iDPsmcofbSK9TRwC70vl0XD3a3yD12VHSKLJRbe3/0uhGXSmT0qGP6MCwlj4ldLYY/8LaEJHBs7X3jmNcnFiAaRNZ+dADfN+Gu5ijD2n5ZPW48ctZQ+h0ff70QPMnMG76/Fdn3WrMoJf3lRect0NGE1lJLGRYdH/8xtJ9VJJ8N7trbSb/sM6JbUqMDEc7zuGLph8k8GwWwolH5tQCdkyfnRilVspq+/vl+erf43bwWGiNLGFsLQLxTLNhfwqAZVyw288WvETtnWhFkxfjo1XPiT2kDqPx7O6ZVRS4eW8uUm9ghVhKBRF5NXvPzE0HEnm2ZNUI+q8aKenqw8gAycCx7HHsV96LiUlE+Qrn0beiJqyWKu2coD+4ZzwOwvqs62dA08L0G1KGEaQNwQYhlNfs1+zUGH3SN7a4gqY3FLO4vmaJ94CPRF4IcPHeSECziUHvIshGKdirkWmgxFWGzZ4bvgu1L7iWHJY6w228OvpJtnYNhKkXHJhqTCG6/XaBQ=='
		}

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
	  	
	  	apigClient.invokeApi({}, '/places', 'POST', {}, place).then((response) => {
	  		resolve(response.data);
	  	}).catch((error) => {
	  		reject(error);
	  	});
	});
}

function getSql() {
	return "" +
		"SELECT fish.name AS fish, fisher.name AS fisher, gear.name AS gear, place.dynamo_id AS placeId, draught.weight, draught.date as catchTime " +
		"FROM draught " +
		"INNER JOIN fish ON fish.fish_id = draught.fish_id " +
		"INNER JOIN fisher ON fisher.fisher_id = draught.fisher_id " +
		"INNER JOIN gear ON gear.gear_id = draught.gear_id " +
		"INNER JOIN place ON place.place_id = draught.place_id";
}

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'antin_kala'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  console.log(getSql());

  var i = 0;

  con.query(getSql(), function(err, result) {
  	setInterval(function() {
  		var item = result[i];

  		insertDraught({
  			fish : item.fish,
  			fisher : item.fisher,
  			gear : item.gear,
  			placeId : item.placeId,
  			catchTime : item.catchTime,
  			weight : item.weight
  		});

  		console.log(i++);
  		if(i == result.length) {
  			process.exit();
  		}
  	}, 1500);
  });
/*
  con.query("SELECT * FROM place", function(err, results, fields) {
  	results.forEach(function(item) {
  		console.log(item);

  		insertPlace({
  			name : item.name,
  			latitude : item.latitude,
  			longitude : item.longitude
  		});
  	});

  }); */
});

