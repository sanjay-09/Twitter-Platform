const user=require("../Models/user");
const CrudRepository=require("../Repository/Crud-repository");

class UserRepository extends CrudRepository{
    constructor(){
        super(user);
    }
    async getWithEmail(data){
        try{
            const response=await user.findOne(data);
            return response;

        }
        catch(err){
            throw err;
        }
    }

}
module.exports=UserRepository;
