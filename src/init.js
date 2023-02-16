import "dotenv/config"; //env에 접근할 수 있도록 최상단에 놓아준다.
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

//데이터베이스와 비디오를 임포트해주고
const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
//어플리케이션을 작동시켜줄것이다.
//이제 서버를 여기서 켜기때문에 json파일을 수정해야한다.
