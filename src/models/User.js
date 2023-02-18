import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avartar: String,
  //githubId: { type: Number, required: false, unique: true },
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("Hashed password", this.password);
}); //여기서 this는 usercreate를 말한다.await을 쓰므로 뒤에 콜백함수를 쓸 필요가 없다.

const User = mongoose.model("User", userSchema);
export default User;
