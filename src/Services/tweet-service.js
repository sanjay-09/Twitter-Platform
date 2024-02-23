const {TweetRepository,hashTagRepository}=require("../Repository/index");
class TweetService{
    constructor(){
        this.TweetRepository=new TweetRepository();
        this.hashtagsRepositoryObj=new hashTagRepository();
    }
    async create(data){
         try{
            console.log("a");
           const tweet=await this.TweetRepository.create(data);
           const content=data.content;
           let tags=content.match(/#[a-zA-Z0-9_]+/g);
           if(tags.length>0){
           tags=tags.map((tag)=>{return tag.substring(1).toLowerCase()});
           }
           let alreadyPresentTags=await this.hashtagsRepositoryObj.findByTag(tags);
           console.log(alreadyPresentTags);
           
         if(alreadyPresentTags.length>0){
           
           alreadyPresentTags.forEach((tag)=>{
              tag.tweets.push(tweet.id);
               tag.save();
           })
           alreadyPresentTags=alreadyPresentTags.map((tag)=>{return tag.title});
        }
           let tagsToBeAdded=tags.filter((tag)=>{return !alreadyPresentTags.includes(tags)});
           tagsToBeAdded=tagsToBeAdded.map((tag)=>{
            return {
                title:tag,
                Tweets:tweet.id

            }
           })
           const tagsCreated=await this.hashtagsRepositoryObj.bulkCreate(tagsToBeAdded);
        
           return tweet;


         }
         catch(err){
            console.log(err);
            throw err;
         }
    }
    async get(id){
        try{
            const response=await this.TweetRepository.get(id);
           if(!response){
            console.log("id not present");
            throw new Error("Id not present")
           }
            return response;

        }
        catch(err){
            throw err;
        }
    }


}
module.exports=TweetService;