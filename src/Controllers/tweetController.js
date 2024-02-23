const TweetService=require("../Services/tweet-service");
const tweetService=new TweetService();
// const upload=require("../config/file-upload-config");
// const uploader=upload.array('image',2);

const create=async(req,res)=>{
    try{
      
        uploader(req,res,async function(err,data){
            if(err){
                return res.status(500).json({error:err})
            }
            
           console.log("body",req.body);
           const payload={...req.body,images:[]};
           const imagesArray=req.files;
           imagesArray.forEach((pic)=>{
            payload.images.push(pic.location);
           })
        
        const response=await tweetService.create(payload);
        return res.status(200).json({
            data:response,
            status:false,
            message:"Succesfully created the tweet",
            err:{}
        })
           

        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:true,
            message:"Cannot create the tweet",
            err:err

        })
    }
}
const getTweet=async(req,res)=>{
    try{
       
        const response=await tweetService.get(req.params.id);
        
        return res.status(200).json({
            data:response,
            status:false,
            message:"Succesfully fetched the tweet",
            err:{}
        })

    }
    catch(err){
        return res.status(500).json({
            data:{},
            status:false,
            message:"Not able to fetch the tweet",
            err:err.message

        })
    }
}
module.exports={
    create,
    getTweet
}