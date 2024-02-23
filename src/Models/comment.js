const mongoose=require("mongoose");
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    onModel:{
        type:String,
        required:true,
        enum:["tweet","comment"]
    },
    commentable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
})
const comment=mongoose.model('comment',commentSchema);
module.exports=comment;