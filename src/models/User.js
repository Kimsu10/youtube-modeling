import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avartarUrl: String,
  //githubId: { type: Number, required: false, unique: true },
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  //한 유저가 여러개의 비디오를 가지고 있을수도 있으니까 배열로 만들었다.
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}); //여기서 this는 usercreate를 말한다.await을 쓰므로 뒤에 콜백함수를 쓸 필요가 없다.

const User = mongoose.model("User", userSchema);
export default User;
