const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const {saltRounds}=require("../config/serverConfig");
const {JWT_SECRET_KEY}=require("../config/serverConfig");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
      
    },
    name:{
        type:String,
        required:true
    }
})

userSchema.pre('save',function(next){
    console.log("ok");
    const user=this;
    const salt = bcrypt.genSaltSync(saltRounds);
    
const hashPassword = bcrypt.hashSync(user.password, salt);
console.log(hashPassword);

user.password=hashPassword;

next();

})

userSchema.methods.verifyPassword=function c(incomingPassword){
    console.log(incomingPassword);
    console.log(this.password);
    return bcrypt.compareSync(incomingPassword, this.password);
}

userSchema.methods.generateToken=function(){
    return jwt.sign({id: this._id, email: this.email}, JWT_SECRET_KEY, {
        expiresIn: '1h'
    });

}
const user=mongoose.model('user',userSchema);
module.exports=user;