export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  console.log(req.session.user);
  next();
};

//로그인 안된사람의 접근을 제한하는 미들웨어 만들기

//유저가 로그인되어있다면 요청을 계속하고 아니라면 로그인 페이지로 보낸다.
export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

//로그인 되어있지않으면 요청을 계속하게하고 로그인상태라면 '/'로 보낸다.
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

//export const uploadFiles = multer({ dest: "uploads/" });
//여기에는 req,res를 쓰지않고 multer()를 사용한다.
