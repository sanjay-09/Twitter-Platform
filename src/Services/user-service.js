const {UserRepository}=require("../Repository/index");

class UserService{
    constructor(){
        this.UserRepositoryObj=new UserRepository();
    }
    async signUp(data){
        try{
            const user=await this.UserRepositoryObj.create(data);
            return user;

        }
        catch(err){
            throw err;
        }
    }
    async getByEmail(data){
        try{
            console.log(data);
            const response=await this.UserRepositoryObj.getWithEmail(data);
            return response;

        }
        catch(err){
            throw err;
        }
    }
    async logIn(data){
        try{
            const user=await this.getByEmail({email:data.email});
           
            if(!user){
                throw new Error("User not present in the database");
            }
            
            const userVerify=user.verifyPassword(data.password);
          
            if(!userVerify){
                throw new Error("password not correct");
            }
            const token=user.generateToken();
            return token;
        }
        catch(err){
            console.log(err);
            throw err;

        }
    }


}
module.exports=UserService;