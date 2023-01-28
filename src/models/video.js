import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});
//video의 어떤 형식으로 정의될지 형태 정의하기

const Video = mongoose.model("Video", videoSchema);
//형태를 정의한후에 model을 만든후 schema(데이터의 형태)로 구성
export default Video;
//이스키마를 항상 사용하기위해 디폴트로 익스포트해줌
//서버에서 import Vidoe from "./models/Video"해서 연결하면 db는 videomodel을 인지한다.
