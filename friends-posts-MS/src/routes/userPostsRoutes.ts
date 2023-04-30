import { Router } from "express"
const router = Router();
import { createPostController, deletePostController ,postFeedController } from "../controller/userPostsController";
import { auth } from "../utils/Middleware/jwtMiddleware";
import { createPostValidator } from "../validator/postValidator";
import { validate } from "../validator";


router.route("/user/post/add").post(auth ,validate(createPostValidator), createPostController)
router.route("/user/post/:postid").delete(auth , deletePostController)
router.route("/user/feed").get(auth, postFeedController)

export default router;  
