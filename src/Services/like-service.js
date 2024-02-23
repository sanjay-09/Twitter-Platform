const {likeRepository}=require("../Repository/index");
const {TweetRepository}=require("../Repository/index")

class LikeService{
    constructor(){
        this.likeRepositoryObj=new likeRepository();
        this.TweetRepositoryObj=new TweetRepository();
    }
    async toggleLike(modelType,modelId,userId){
        if(modelType==="tweet"){
            var likeable=await this.TweetRepositoryObj.get(modelId);
            console.log(likeable);

        }
        else if(modelType==="comment"){

        }
        const exist=await this.likeRepositoryObj.findByData({
            onModel:modelType,
            likes:modelId,
            user:userId
        });
        console.log(exist);
         
        if(exist){
            likeable.likes.pull(exist.id);
            await likeable.save();
           await this.likeRepositoryObj.delete(exist.id);

        }
        else{
           const likeCreate=await this.likeRepositoryObj.create({
            onModel:modelType,
            likes:modelId,
            user:userId
            
           })
           console.log(likeCreate);
           likeable.likes.push(likeCreate.id);
           await likeable.save();
        }
        return true;

    }


}
module.exports=LikeService;