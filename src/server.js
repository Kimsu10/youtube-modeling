import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true })); //expree application이 form의 value들을이해할 수 있고 form을 자바스크립트 형식으로 변형시켜준다.
//app.get을 지우고 app.use를쓰는이유 나중에 url이 여러개가 되는데 url을 그룹별로 정리하지않으면 지저분해보이며, 찾기어려워져서 도메인에따라 그룹화했다.
//url 플랜을 짤때는 유저의 입장에서 생각해야한다.
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
