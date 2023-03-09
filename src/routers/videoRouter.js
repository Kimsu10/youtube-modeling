import express from "express";
import {
  watch,
  getEdit,
  deleteVideo,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import { protectMiddleware } from "../middlewares";

const videoRouter = express.Router();

//익스프레스가 위에서부터 읽어내려오는데 /:id가 upload보다 위에있으면 익스프레스는 upload가 id자리에있어 id라고 생각해버린다.
//때문에 upload가 있어도 upload까지 보지않고 그 위의 id에서 멈춰버린다.
// videoRouter.get("/:id(||d+)", search);
videoRouter.get("/:id([0-9a-f]{24})", watch); //video 라우터 안이기 때문에 video/watch라고 쓸 필요가 없다.
//파라미터에 숫자만 오게함.이렇게하면 upload가 아래로 내려와도 괜찮다.(express 정규표현식 공부하기)
//videoRouter.route("/:id(\\+d)/edit").get(getEdit).post(postEdit);
//->/:id/edit이라는 url의 라우터를 만들어주고getreq를위한 handler와 post req를 위한 핸들러를 붙여주었다.
videoRouter.get("/:id([0-9a-f]{24})/edit", protectMiddleware, getEdit);
videoRouter.post("/:id([0-9a-f]{24})/edit", protectMiddleware, postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectMiddleware, deleteVideo);
//:id? 파라미터: url안에 변수를 포함시킬수 있게 해준다. 파라미터가 없다면 페이지마다 새로운 라우터를 만들어야했을것이다.
//내가 사이트 끝에 /:아무숫자를 넣으면 express가 그 숫자를  :id에 넣어준다. 이게 가능한 이유는 이렇게 표시/:하는것이 익스프레스에게 변수라는것을알려주기 때문이다.
//:이 없으면 단순히 텍스트가 필요한거라 생각해서 작동하지 않게된다.
videoRouter.get("/upload", protectMiddleware, getUpload);
videoRouter.post("/upload", protectMiddleware, postUpload);
//videoRouter.route("upload").get(getUpload).post(postUpload);
//videoRouter.post("/")

export default videoRouter;
