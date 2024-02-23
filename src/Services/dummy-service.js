const helper=require("./dummy-service2");
const execute=()=>{
    const a=helper();
    console.log(a);

    if(a){
        return "abc"
    }
    else{
       return  "Bye"
    }
}
module.exports=execute;
