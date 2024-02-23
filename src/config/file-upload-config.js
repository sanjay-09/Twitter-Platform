const aws=require("aws-sdk");
const multer=require("multer");
const multerS3=require("multer-s3");
const serverConfig=require("./serverConfig")
aws.config.update({
    region:serverConfig.AWS_REGION,
    secretAccessKey:serverConfig.SECRET_ACCESS_KEY,
    accessKeyId:serverConfig.ACCESS_KEY
})
const s3=new aws.S3();
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: serverConfig.BUCKET,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  });
  module.exports=upload; 
  