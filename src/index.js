const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./config/serverConfig");
const connect=require("./config/database");
const morgan=require("morgan");
const apiRouter=require("./Routes/index")
const TweetService=require("./Services/tweet-service");
const LikeService=require("./Services/like-service");
const UserRepository=require("./Repository/User-repository");
const passport=require("passport");
const passportAuth=require("./config/authenticateMidd");



const startServer=()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(morgan());
app.use(passport.initialize());
passportAuth(passport);

    app.use("/api",apiRouter);

    app.get("/",(req,res)=>{
        return res.send("ok");
    })

    app.listen(PORT,async(req,res)=>{
        console.log(`Listening on the PORT ${PORT}`)
        await connect();
        console.log('database connected');
       

  
})
}
startServer();