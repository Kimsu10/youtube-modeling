import mongoose from "mongoose"; //몽구스 임포트하기

mongoose.connect("mongodb://127.0.0.1:27017/wetube");
//connect(uris:string, options:mongoose.ConnectOprions,callback:Promise)
//mongodb에 데이터베이스를 연결하는 방법은 url에 연결한뒤 '/'를적고 데이터베이스이름을 적으면 된다.
//서버.js에 임포트해야한다.

//옵션 경고 안떴는데 적어봄{useNewUrlParser: true, useUnifiedTopology:true,}
const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = () => console.log("❌DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

//db를 mongoose와연결시켜 video model을 인식시켜야한다.
