const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

const async = require('async');

const actions = {
	/**
	 * Adds new user group for user
	 * @param {String} userId    AWS Cognito user Id
	 * @param {Object} userGroup User group JSON
	 */
	addNewUserGroup : function(userId, userGroup) {
		const self = this;

		return new Promise((resolve, reject) => {
			const groupId = uuidv4();

			userGroup.groupId = groupId;

			const tableRequest = {
				TableName : process.env.TABLE_NAME_USER,
				Item : {
					Id : userGroup.groupId,
					Name : userGroup.name,
					Owner : userId
				}
			};

			dynamoDb.put(tableRequest, (err, result) => {
				if(err) {
					reject(err);
				} else {
					self.addUserGroupToUser(userId, groupId).then((response) => {
						resolve(response);
					}).catch((error) => {
						reject(error);
					});
				}
			});
		});
	},
	/**
	 * Adds user group to user
	 * @param {String} userId  AWS Cognito user id
	 * @param {String} groupId User group id
	 */
	addUserGroupToUser : function(userId, groupId) {
		const self = this;

		return new Promise((resolve, reject) => {
			self.getUser(userId).then((user) => {

				const tableRequest = {
					TableName : process.env.TABLE_NAME_USER,
					Key : {
						Id : userId
					},
					UpdateExpression : 'SET #list = list_append(#list, :vals)',
					ExpressionAttributeNames: {
					    "#list": "Groups"
					},
					ExpressionAttributeValues : {
					    ':vals': [{
					    	groupId : groupId
					    }]
					}
				};

				dynamoDb.update(tableRequest, (err, result) => {
					if(err) {
						reject(err);
					} else {
						resolve({
							success : true
						});
					}
				});
			}).catch((error) => {
				reject(error);
			});
		});
	},
	/**
	 * Saves user to the database
	 * @param  {Object} user User object
	 * @return {Promise}
	 */
	saveUser : function(user) {
		return new Promise((resolve, reject) => {
			const tableRequest = {
				TableName : process.env.TABLE_NAME_USER,
				Item : user
			};

			dynamoDb.put(tableRequest, (err, result) => {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},
	/**
	 * Checks if user has rights to read the user group information
	 * @param  {String} userId  AWS Cognito userId
	 * @param  {String} groupId User group id
	 * @return {Promise}
	 */
	checkUserGroup : function(userId, groupId) {
		const self = this;

		return new Promise((resolve, reject) => {
			self.getUser(userId).then((user) => {
				console.log(JSON.stringify(user));

				console.log("Checking groups for " + groupId);
				let hasAccess = false;

				async.each(user.Groups, (group, callback) => {
					console.log(group + ", checking if its correct");
					if(group.trim() === groupId.trim()) {
						hasAccess = true;
						callback();
					} else {
						callback();
					}
				}, (err) => {
					if(err) {
						reject(err);
					} else if(!hasAccess) {
						reject({
							message : "ACCESS_DENIED"
						});
					} else {
						resolve({
							message : "ACCESS_GRANTED"
						});
					}
				});
			}).catch((error) => {
				reject(error);
			});
		});
	},

	getSelectedUserGroup : function(userId) {
		const self = this;

		return new Promise((resolve, reject) => {
			self.getUser(userId).then((user) => {
				let userGroupId = null;

				if(user.Groups != null && user.Groups.length == 1) {
					resolve(user.Groups[0].groupId);
				} else if(user.Groups != null && user.Groups.length > 1) {
					async.each(user.Groups, (group, callback) => {
						if(group.selected) {
							userGroupId = group.groupId;
						}
					}, function(err) {
						if(userGroupId == null) {
							reject({
								message : 'NO_SELECTED_USER_GROUP'
							});
						} else {
							resolve(userGroupId);
						}
					});
				} else {
					reject({
						message : 'NO_USERGROUPS'
					});
				}
			});
		});
	},

	selectUserGroup : function(userId, groupId) {
		const self = this; 

		return new Promise((resolve, reject) => {
			self.getUser(userId).then((user) => {
				const userGroups = [];

				async.each(user.Groups, (group, callback) => {
					if(group.groupId == groupId) {
						group.selected = true;
					} else {
						group.selected = false;
					}

					userGroups.push(group);

					callback();
				}, function(err) {
					const tableRequest = {
						TableName : process.env.TABLE_NAME_USER,
						Key : {
							Id : userId
						},
						UpdateExpression : 'SET #list = :vals',
						ExpressionAttributeNames: {
						    "#list": "Groups"
						},
						ExpressionAttributeValues : {
						    ':vals': userGroups
						}

					};

					dynamoDb.update(tableRequest, (err, result) => {
						if(err) {
							reject(err);
						} else {
							resolve({
								success : true
							});
						}
					});
				});


			});
		});
	},
	/**
	 * Gets user entry from the database
	 * @param  {String} userId AWS Cognito user id
	 * @return {Promise}
	 */
	getUser : function(userId) {
		const self = this;

		return new Promise((resolve, reject) => {
			const tableRequest = {
				TableName : process.env.TABLE_NAME_USER,
				Key : {
					Id : userId
				}
			};

			dynamoDb.get(tableRequest, (err, result) => {
				if(err) {
					reject(err);
				} else {
					if(result.Item == null) {
						const user = {
							Id : userId,
							Groups : []
						}

						self.saveUser(user).then((response) => {
							resolve(user);
						}).catch((error) => {
							reject(error);
						});
					} else {
						resolve(result.Item);
					}
				}
			});
		});
	}
};

module.exports = actions;
