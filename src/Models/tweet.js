const mongoose=require("mongoose");
const tweetSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
        max:[255,"Tweet cannot be more than 250 characters"]
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    images:
        {
            type:[String]
        }
        
    
},{timestamps:true})
const tweet=mongoose.model('tweet',tweetSchema);
module.exports=tweet;