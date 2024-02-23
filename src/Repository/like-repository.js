const like=require("../Models/like");
const CrudRepository=require("./Crud-repository")



class likeRepository extends CrudRepository{

    constructor(){
        super(like);
    }
    async findByData(data){
        try{
            const response=await like.findOne(data);
            return response;

        }
        catch(err){
            throw err;
        }
    }

}
module.exports=likeRepository;