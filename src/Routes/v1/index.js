const router=require("express").Router();
const tweetController=require("../../Controllers/tweetController");
const toggleLikeController=require("../../Controllers/likeController");
const commentController=require("../../Controllers/commentController");
const UserController=require("../../Controllers/userController");
const authenticate=require("../../Middleware/authMiddleware")



router.post("/create", authenticate,tweetController.create);
router.post("/toggleLike",toggleLikeController.toggleLike);
router.post("/comment",commentController.createComment);
router.get("/tweet/:id",tweetController.getTweet);

router.post("/signUp",UserController.signUp);
router.post("/signIn",UserController.signIn);



module.exports=router;