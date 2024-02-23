const dotenv=require("dotenv");
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    saltRounds:10,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    ACCESS_KEY:process.env.ACCESS_KEY,
    SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY,
    AWS_REGION:process.env.AWS_REGION,
    BUCKET:process.env.BUCKET

}