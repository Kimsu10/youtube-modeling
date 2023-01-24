import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
//익스프레스가 위에서부터 읽어내려오는데 /:id가 upload보다 위에있으면 익스프레스는 upload가 id자리에있어 id라고 생각해버린다.
//때문에 upload가 있어도 upload까지 보지않고 그 위의 id에서 멈춰버린다.

videoRouter.get("/:id(||d+)", see); //video 라우터 안이기 때문에 video/watch라고 쓸 필요가 없다.
//파라미터에 숫자만 오게함.이렇게하면 upload가 아래로 내려와도 괜찮다.(express 정규표현식 공부하기)
videoRouter.get("/:id(||d+)/edit", edit);
videoRouter.get("/:id(||d+)/delete", deleteVideo);
//:id? 파라미터: url안에 변수를 포함시킬수 있게 해준다. 파라미터가 없다면 페이지마다 새로운 라우터를 만들어야했을것이다.
//내가 사이트 끝에 /:아무숫자를 넣으면 express가 그 숫자를  :id에 넣어준다. 이게 가능한 이유는 이렇게 표시/:하는것이 익스프레스에게 변수라는것을알려주기 때문이다.
//:이 없으면 단순히 텍스트가 필요한거라 생각해서 작동하지 않게된다.
//

export default videoRouter;
