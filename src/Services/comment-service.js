const { CommentRepository,TweetRepository}=require("../Repository/index");

class CommentService{
    constructor(){
        this.commentRepositoryObj=new CommentRepository();
        this.TweetRepositoryObj=new TweetRepository();

    }
    async createComment(modelType,modelId,userId,content){
        try{
            if(modelType=='tweet'){
                var commentable=await this.TweetRepositoryObj.get(modelId);
            }
            else if(modelType=="comment"){
                var commentable=await this.commentRepositoryObj.get(modelId);
    
            }
            else{
                throw new Error("ModelType does not existed")
            }
            const comment=await this.commentRepositoryObj.create({
                content:content,
                userId:userId,
                onModel:modelType,
                commentable:modelId,
                comments:[]
            })
            commentable.comments.push(comment);
            await commentable.save();
            return comment;
    
        }
        catch(err){
            console.log(err);
            throw err;
        }
        }

}
module.exports=CommentService;