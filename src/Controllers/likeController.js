const LikeService=require("../Services/like-service");
const LikeServiceObj=new LikeService();

const toggleLike=async(req,res)=>{
    try{
        const response=await LikeServiceObj.toggleLike(req.query.modelType,req.query.modelId,req.body.userId);
        return res.status(200).json({
            data:response,
            status:true,
            message:"Succesfully toggle the like",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:'Cannot toggle the like',
            err:err
        })
    }

}

module.exports={
    toggleLike
}