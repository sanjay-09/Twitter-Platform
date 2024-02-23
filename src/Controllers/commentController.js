const CommentService=require("../Services/comment-service");
const commentServiceObj=new CommentService();


const createComment=async(req,res)=>{
    try{
        
       console.log(req.body);
           const comment=await commentServiceObj.createComment(req.query.modelType,req.query.modelId,req.body.userId,req.body.content);
           return res.status(200).json({
            data:comment,
            status:true,
            message:"created the comment",
            err:{}
           })
    }
    catch(err){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Cannot create the comment",
            err:{}

        })
    }

}

module.exports={
    createComment
}