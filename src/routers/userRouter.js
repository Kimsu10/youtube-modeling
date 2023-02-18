import express from "express";
import {
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/logout", logout);
//라우터와 컨트롤러는 함께스면 좋지않은데, 라우터는 컨트롤러라는 함수를 이용하는것이지만 컨트롤러는 함수라서 굉장히 많은 수식들이 들어갈 것이라서이다.
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
export default userRouter;
