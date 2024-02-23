const tweet=require("../Models/tweet");
class TweetRepository{

   async create(data){
    try{
        console.log(data);
        const UserTweet=tweet.create(data);
        return UserTweet

    }
    catch(err){
       
        throw err;

    }
   }

   async get(id){
    try{
        
        const UserTweet=tweet.findById(id);
      
      
       
        return UserTweet;

    }
    catch(err){
        console.log("error in repo layer");
        
        throw err;
    }
   }
   

   async update(id,data){
    try{
        const updatedTweet=await tweet.findByIdAndUpdate(id,data,{new:true});
        return updatedTweet;
    }
    catch(err){
        throw err;
    }
   }
   async delete(id,data){
    try{
        await tweet.findByIdAndDelete(id);

    }
    catch(err){
        throw err;
    }
   }
   async getAll(offset, limit) {
    try {
        const tweets = await tweet.find().skip(offset).limit(limit);
        return tweets;
    } catch (error) {
      throw error;
    }
}


}
module.exports=TweetRepository;