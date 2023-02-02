import express from "express"; //각각의 파일들은 독립적이기에 새롭게 불러와야한다.
import { getJoin, postJoin, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router(); //글로벌 라우터를 만듬

//const handleHome = (req, res) => res.send("Home"); //굴로벌라우터를 설정

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);
export default rootRouter; //그로벌라우터를 외부에서 쓸수있도록 익스포트함
