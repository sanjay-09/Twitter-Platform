const mongoose=require("mongoose");
const HashtagSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"tweet"
        }
    ]

},{timestamps:true})
const hashtag=mongoose.model("hashtag",HashtagSchema);
module.exports=hashtag;