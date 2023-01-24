import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();

const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//app.get을 지우고 app.use를쓰는이유 나중에 url이 여러개가 되는데 url을 그룹별로 정리하지않으면 지저분해보이며, 찾기어려워져서 도메인에따라 그룹화했다.
//url 플랜을 짤때는 유저의 입장에서 생각해야한다.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
