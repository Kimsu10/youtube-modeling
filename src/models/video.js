import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  //데이터베이스쪽에도 html제한을 쓰는이유는 누군가 해킹햇을때 보호하기 위해서이다.
  fileUrl: { type: String, required: true }, //이제  비디오없이는 파일업로드가 안된다.
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  //default를 설정함으로써 컨트롤러에서 createdAt을 안써도 된다.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, reauired: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
//ref는 reference, "User"은 User.js의 User
//video의 어떤 형식으로 정의될지 형태 정의하기

// videoSchema.pre("save", async function () {
//   console.log(this.hashtags);
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const Video = mongoose.model("Video", videoSchema);
//형태를 정의한후에 model을 만든후 schema(데이터의 형태)로 구성
export default Video;
//이스키마를 항상 사용하기위해 디폴트로 익스포트해줌
//서버에서 import Vidoe from "./models/Video"해서 연결하면 db는 videomodel을 인지한다.
