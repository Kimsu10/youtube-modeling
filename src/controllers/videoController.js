import Video from "../models/video";

export const home = (req, res) => {
  console.log("start");
  Video.find({}, (error, videos) => {
    console.log("finished");
    return res.render("home", { pageTitle: "Home", videos });
  });
};

export const search = (req, res) => res.send("Search");

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching` }); //->watch라는 템플릿을 렌더링해줌
};

//res.send("See video");
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.redirect(`/videos/${id}`); //redirect()는 브라우저가 자동으로 이동하도록 하는것이다.
};

export const deleteVideo = (req, res) => res.send("Delete Video");
//export default와 각각의 변수를 export하는 것의 차이점
//각각의 변수에 익스포트를 하면 한파일이 여러개를 익스포트할 수 있다.
//이 경우 globalRouter에서 import시 {join}으로 import한다.
//default와 달리 디폴트값이아닌 여러개의 변수로지정되어있어 불러오고싶은 변수를 선언된 변수명 그대로 라우터에 임포트해야한다.

//export default trendingVideos;
// default는 하나의 파일이 하나만 export할 수있다. 내가 원하는 어떤 이름으로든 임포트가 가능하다.
//하나의 파일은 하나의 디폴트 익스포트밖에 가질수 없으므로 nodejs가 defult export를 가지고 자동으로 이름을 바꿔주기때문에
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  //here we will add a videos array
  const { title } = req.body;
  return res.redirect("/");
};
