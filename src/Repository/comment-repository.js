const CrudRepository=require("../Repository/Crud-repository");
const comment=require("../Models/comment")

class CommentRepository extends CrudRepository{
    constructor(){
        super(comment);
    }

}
module.exports=CommentRepository;