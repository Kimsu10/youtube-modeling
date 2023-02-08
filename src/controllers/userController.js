import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  console.log(req.body);
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "duplicated username/email",
    });
  }
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "password does not match",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      password2,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "an Account with this username deos not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  //세션에 정보 추가하기
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const deleteUser = (req, res) => res.send("Delete User");
export const edit = (req, res) => res.send("Edit User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
//export default join;
