const { LocationClient, ListKeysCommand ,amazonLocationAuthHelper } = require("@aws-sdk/client-location");
const region = process.env.AWS_BUCKEt_REGION
const accessKeyId =  process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


// var AWS = require('aws-sdk');
// AWS.config.update({region:'us-east-1'});
// const { withAPIKey } = require( '@aws/amazon-location-utilities-auth-helper');
async function  test(){
    // const authHelper = await withAPIKey("arn:aws:geo:us-east-1:431611754045:api-key/L1"); // use API Key id for credentials
    const authHelper = await amazonLocationAuthHelper.withAPIKey('v1.public.eyJqdGkiOiI4YTQwYmM4NS0zMWRjLTQ0YWUtYjFlYS05ODhkYjExNzA1ZjcifSO2Hh5HH1yfDayrRAzsSPy7bIoJbk7ca3uzdSX0UM48M8unZzLKyBJatEcLg0o7PP_6H469uv6DpBz8dAyjr6UBEM72E6KQOBn5C89b1ZVCMwJY_gTaOViUX4z-PuJMtEvHaQ7t1jMFd-l89v2ONQgtAS_tCvw-TATF5ej4QG3DFfxBYQw8z_qrqERVKoFC92uGDrna1YWo6ktgAeL5clXUG8xNQTNTlhuJHvURsdca0wbpkU1HxitBcbPSOJWLphgkrRzL5gGwBojLfBYyQLO_qcTSkWIJz7epugLfh0YdujvOK5Mk2TB8JXkQI7kwjlscwNY6K2mHjBDihqrs__s.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx');

    //initialize the Location client:
    const client = new LocationClient({
        region:'us-east-1',
        accessKeyId:accessKeyId,
        secretAccessKey:secretAccessKey,
        ...authHelper.getLocationClientConfig()
        // ...authHelper.getLocationClientConfig() // sets up the Location client to use the API Key defined above
    });

    //call a search function with the location client:
    const result = await client.send(new ListKeysCommand({
        IndexName: "place-index", // Place index resource to use
        Position: [-123.1187, 49.2819], // position to search near
        MaxResults: 10 // number of results to return
    }));
    console.log(result)
}
test()
