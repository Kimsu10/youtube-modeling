import express from "express";
import {
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectMiddleware,
  publicOnlyMiddleware,
  avartarupload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEdit)
  .post(avartarupload.single("avartar"), postEdit);
//위와같음.get(protectMiddleware, getEdit).post(protectMiddleware, postEdit);
userRouter.get("/logout", protectMiddleware, logout);
//라우터와 컨트롤러는 함께스면 좋지않은데, 라우터는 컨트롤러라는 함수를 이용하는것이지만 컨트롤러는 함수라서 굉장히 많은 수식들이 들어갈 것이라서이다.
userRouter
  .route("/change-password")
  .all(protectMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);
export default userRouter;
