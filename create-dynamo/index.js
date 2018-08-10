var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "DraughtUser",
    KeySchema: [
        { AttributeName: "Id", KeyType: "HASH"},  //Partition key

	],
    AttributeDefinitions: [
        { AttributeName: "Id", AttributeType: "S" },

	],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, (err, data) => {
	if(err) {
		console.log(JSON.stringify(err));
	} else {
		console.log(JSON.stringify(data));
	}
});
