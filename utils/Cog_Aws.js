require('dotenv').config()
const AWS = require('aws-sdk');
const crypto = require('crypto');
let secretHash = 'toa5pjujrnp8h3d5pq2l20gq7gb8bl9eleaeq4a51n2ae78ac3g'
var cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: process.env.Location_Region,
  })
exports.Sig_Use=async (username, password, userAttr) => {
   var params = {
    ClientId:  process.env.coginito_client_id, /* required */
    Password: password, /* required */
    Username: username, /* required */
    // UserAttributes: userAttr,
  }
   try {
     const data = await cognitoIdentity.signUp(params).promise()
    //  console.log(data)
     return data
   } catch (error) {
    //  console.log(error)
     return error
   }
 }
exports.Sig_In_Use = async (username, password) => {
        var params = {
          AuthFlow: 'USER_PASSWORD_AUTH', /* required */
          ClientId: process.env.coginito_client_id, /* required */
          AuthParameters: {
            'USERNAME': username,
            'PASSWORD': password,
            // 'SECRET_HASH': this.hashSecret(username)
          },
        }
    
        try {
          let data = await cognitoIdentity.initiateAuth(params).promise();
          // console.log(data); 
          return true;
        } catch (error) {
          // console.log(error)
          return error;
        }
      }

exports.Con_Use = async(username, code) => {
      var params = {
        ClientId:   process.env.coginito_client_id,
        ConfirmationCode: code,
        Username: username,
        // SecretHash: this.hashSecret(username),
      };
  
      try {
        const cognitoResp = await cognitoIdentity.confirmSignUp(params).promise();
        console.log(cognitoResp)
        return cognitoResp
      } catch (error) {
        return error
      }
    }

