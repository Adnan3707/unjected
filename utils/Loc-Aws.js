// const { LocationClient, SearchPlaceIndexForTextCommand ,SearchPlaceIndexForPositionCommand} = require("@aws-sdk/client-location");
// const { withAPIKey } = require("@aws/amazon-location-utilities-auth-helper");

// const apiKey = process.env.Location_AWS_Key

// exports.Loc = async (data) =>{
//     // Create an authentication helper instance using an API key
//     const authHelper = await withAPIKey(apiKey);

// const client = new LocationClient({
//   region: process.env.Location_Region, // region containing Cognito pool
//   ...authHelper.getLocationClientConfig(), // Provides configuration required to make requests to Amazon Location
// });

// if(data.id === 'text'){
//   const input = {
//     IndexName: process.env.Location_Index,
//     Text: data.value,
//     "MaxResults": 5,
//   };
//   const command = new SearchPlaceIndexForTextCommand(input);
//       try {
//         const data = await client.send(command);
//         // process data.
//         return data.Results;
//     } catch (error) {
//         console.error(error);
//         // error handling.
//     }
// }else {
//   const coord ={
//     IndexName: process.env.Location_Index,
//     "Position":[data.Cor.long,data.Cor.lat],
//     "MaxResults": 5,
//   }    
//   const command = new SearchPlaceIndexForPositionCommand(coord)
//     try {
//       const data = await client.send(command);
//       // process data.
//       return data.Results;
//   } catch (error) {
//       console.error(error);
//       // error handling.
//   }
// }

// }
