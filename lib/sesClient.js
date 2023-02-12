const {fromIni} = require("@aws-sdk/credential-providers");
// var credentials = new AWS.SharedIniFileCredentials({profile: 'ses-smtp-user.20230115'});
const { SESClient } = require("@aws-sdk/client-ses");


// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
// const s3Client = new SESClient({
//   credentials: fromIni({profile: 'work-account'})
// });

const sesClient = new SESClient({ region: REGION, credentials: fromIni({profile: 'ses-smtp-user.20230115'})});
module.exports= { sesClient };

