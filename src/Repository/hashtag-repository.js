const hashtag=require("../Models/Hashtag");
class hashTagRepository{
    async create(data){
        try{
            const hashtagData=await hashtag.create(data);
            return hashtagData;

        }
        catch(err){
            throw err;
        }
    }
    async bulkCreate(data){
        try{
            const response=await hashtag.insertMany(data);
            return response;

        }
        catch(err){
            throw err;
        }
    }
    async get(id){
        try{
            const hashtagGetData=await hashtag.findById(id);
            return hashtagGetData;

        }
        catch(err){
            throw err;
        }

    }
    async update(id){
        try{
            const updatedHashtag=await hashtag.findByIdAndUpdate(id,data,{new:true});
            return updatedHashtag;

        }
        catch(err){
            throw err;
        }
    }
    async delete(id){
        try{
            await hashtag.findByIdAndDelete(id,data);
            return true;

        }
        catch(err){
            throw err;
        }
    }
    async findByTag(titleList){
        try{
            const response=await hashtag.find({
                title:titleList
            });
            return response;

        }
        catch(err){
            throw err;
        }
    }

}
module.exports=hashTagRepository;