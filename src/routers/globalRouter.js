import express from "express"; //각각의 파일들은 독립적이기에 새롭게 불러와야한다.
import { join, login } from "../controllers/userController";
import { homePage, search } from "../controllers/videoController";

const globalRouter = express.Router(); //글로벌 라우터를 만듬

//const handleHome = (req, res) => res.send("Home"); //굴로벌라우터를 설정

globalRouter.get("/", homePage);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);
export default globalRouter; //그로벌라우터를 외부에서 쓸수있도록 익스포트함
