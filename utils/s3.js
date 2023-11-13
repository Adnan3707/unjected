// require('dotenv').config()
// const fs = require('fs');

// const S3 = require('aws-sdk/clients/s3');
// const path = require('path');
// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKEt_REGION
// const accessKeyId =  process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey
// })
// const sharp = require('sharp');
// async function uploadFile(file,req){
//     // const fileStream = fs.createReadStream(file.path)
//     // console.log(path.format(path.parse(file.path)))
//     console.log('format',path.format(file))
//     console.log('dir name',path.dirname(file.path))
// await sharp(file.path)
//   .resize(320, 240)
//   .toFile(file.destination+file.filename.replace(/(\.[^.]+)$/, '_medium$1'));
//  await sharp(file.path)
//   .resize(240, 120)
//   .toFile(file.destination+file.filename.replace(/(\.[^.]+)$/, '_small$1'));
//  fs.readdir(file.destination,(err,files)=>{
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(async function (fileDir) {
//             const uploadParams = {
//         Bucket: bucketName,
//         Body: fs.createReadStream(path.join(file.destination,fileDir)),
//         Key: path.join(path.dirname(file.path),fileDir).replace(/\\/g, '/') // Check For Lunix
//     }
//     await s3.upload(uploadParams).promise()
//     })
//  })
//  return {key:'uploaded Success'}
// //   console.log(Fil_Str_1)
// // function Par(bucketName,fileStream,file){
// //     return {
// //         Bucket: bucketName,
// //         Body: fileStream,
// //         Key: path.format(path.parse(file.path)).replace(/\\/g, '/') // Check For Lunix
// //     }
// // }
// //     // const uploadParams = {
// //     //     Bucket: bucketName,
// //     //     Body: fileStream,
// //     //     Key: path.format(path.parse(file.path)).replace(/\\/g, '/') // Check For Lunix
// //     // }
// //     return Promise.all([Par(bucketName,fileStream,file),Par(bucketName,Fil_Str_1,file),Par(bucketName,Fil_Str_2,file)])
// //     // return s3.upload(uploadParams).promise()
// }
// function getFileStream(key,Ite){
//     // if(Ite=='Pro'){
//     //     return s3.getObject({ Key:key.replace(/(\.[^.]+)$/, '_medium$1'),Bucket: bucketName}).createReadStream()
//     // } else{
//     //     return s3.getObject({ Key:key.replace(/(\.[^.]+)$/, '_small$1'),Bucket: bucketName}).createReadStream()
//     // }  
//     return s3.getObject({ Key:key,Bucket: bucketName}).createReadStream()

// }
// function delImage(key){
//     const Del_Par ={
//         Key:key,
//         Bucket: bucketName
//     }
//     return s3.deleteObject(Del_Par).promise()
// }
// exports.uploadFile = uploadFile
// exports.getFileStream = getFileStream
// exports.delImage = delImage