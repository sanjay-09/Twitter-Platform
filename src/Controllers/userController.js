const UserService=require("../Services/user-service");
const UserServiceObj=new UserService();

const signUp=async(req,res)=>{
    try{
        const response=await UserServiceObj.signUp(req.body);
        console.log("response",response);
        return res.status(200).json({
            data:response,
            status:true,
            message:"Created the user",
            err:{}

        })

    }
    catch(err){
        console.log("inside catch block");
        console.log(err.message);
        return res.status(500).json({
            data:{},
            status:false,
            message:"Cannot signUp",
            err:err.message
        })
    }
}
const signIn=async(req,res)=>{
    try{
           const response=await UserServiceObj.logIn(req.body);
           return res.status(200).json({
            data:response,
            status:false,
            message:"login successfully",
            err:{}
            
           })
    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"Cannot authenticate",
            err:{err}
        })
    }
}
module.exports={
    signUp,
    signIn
}