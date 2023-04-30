import { Router } from "express"
const router = Router();

import { sendFriendRequestController, acceptFriendRequestController, friendsListController, pendingFriendRequestListController } from "../controller/friendrequestController"
import { auth } from "../utils/Middleware/jwtMiddleware";


router.route("/user/friend-request/send/:recipientid").post(auth , sendFriendRequestController)
router.route("/user/friend-request/:recipientid/action/:actiontype").post(auth , acceptFriendRequestController)
router.route("/user/friend-request/pending-list").get(auth , pendingFriendRequestListController)
router.route("/user/friend-list").get(auth , friendsListController)

export default router;  