const axios = require('axios');
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'the-wellness-comp',
  apiKey: '5ba5f481d15e383094bed50e311fa975',
  password: '57eba70ba7b212610a0410b99df77182'
});
let apiKey = '5ba5f481d15e383094bed50e311fa975'
// let pass = '57eba70ba7b212610a0410b99df77182'
let pass = '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'
// shopify.order
//   .list({ limit: 5 })
//   .then((orders) => console.log(orders))
//   .catch((err) => console.error(err));

  const productId = "11235813213455";
// `session` is built as part of the OAuth process
// const client = new shopify.clients.Rest({
//   shopName: 'the-wellness-comp',
//   apiKey: '5ba5f481d15e383094bed50e311fa975',
//   password: '57eba70ba7b212610a0410b99df77182'
// });
// const product =  client.get({
//   path: `products/${productId}`,
//   query: {id: 1, title: "title"}
// });


let options = {
  'method':'GET',
  'url':`https://${apiKey}:${pass}@the-wellness-comp.myshopify.com/admin/api/2022-07`,
  'headers':{
    'Content-Type':'application/json'
  }
}

axios(options,(error,resp)=>{
  if(error) throw new Error(error);
  console.log(resp)
})



// const res =  axios.get(options);

// console.log(res)