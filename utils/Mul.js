const multer  = require('multer')
const fs = require('fs')
const path = require('path')
// const upload = multer({ dest: 'uploads/' })
// let storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       let dest = path.join(__dirname, './images/profile/pictures', 'somenameigetfromtheuser');
//       let stat = null;
//       try {
//         stat = fs.statSync(dest);
//       }
//       catch (err) {
//         fs.mkdirSync(dest);
//       }
//       if (stat && !stat.isDirectory()) {
//         throw new Error('Directory cannot be created');
//       } 
//       cb(null, dest);
//     }
//   });
  

exports.upload = (folderName) => {
  return imageUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `./images/profile/pictures/${req.params.Cog_id}/`;
        // const path= path.join(__dirname, `./images/profile/pictures/${folderName}/`);
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
      },

      // By default, multer removes file extensions so let's add them back
      filename: function (req, file, cb) {
        // cb(null, file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
      }
    }),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
      }
      cb(null, true);
    }
  })
}
//   let upload = multer({
//     storage: storage,
//     dest: 'documents/'
//   });
// export default upload