import { Router } from "express";
const router = Router();
import { userLoginController, userSignUpController, verifyEmailController , getNewAccessTokenController } from "../controller/userAuthController";
import { validate } from "../validator";
import { userLogInValidator, userSignUpValidator, verifyEmailValidator } from "../validator/user";


//public 
router.route("/signup").post(validate(userSignUpValidator), userSignUpController)
router.route("/login").post(validate(userLogInValidator), userLoginController)
router.route("/verify-email/:token").get(validate(verifyEmailValidator), verifyEmailController)
router.route("/new-access-token/:token").get(getNewAccessTokenController)

export default router;  