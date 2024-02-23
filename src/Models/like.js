const mongoose=require("mongoose");
const likeSchema=new mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['tweet','comment']
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
const like=mongoose.model('like',likeSchema);
module.exports=like; 