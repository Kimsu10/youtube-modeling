import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", { error });
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
// export const search = async (req, res) => {
//   const { keyword } = req.query;
//   //let videos = []; //블록밖에서 쓸꺼라 const쓰면 안된다.
//   if (keyword) {
//     const videos = await Video.find({
//       // title: {
//       //   //$regex: new RegExp(keyword, "i"),//i를 포함하는 키워드를 검색
//       //   //$regex: new RegExp(`^${keyword`}, "i")// i로 시작하는 단어만,키워드뒤에 $면 끝나는 단어
//       // },
//       title: keyword,
//     });
//     return res.render("search", { pageTitle: "Search", videos });
//   }
// };

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("watch", { pageTitle: video.title, video: video }); //->watch라는 템플릿을 렌더링해줌
  } else {
    return res.render("404", { pageTitle: "Video not found" });
  }
}; //return이 watchFunction의 id를 리턴해줌

//res.send("See video");
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id); //video를 먼저 찾고
  if (!video) {
    //비디오가 없으면 에러
    return res.render("404", { pageTitle: "Video not found" });
  } else {
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
  } //리턴이 없으면 에러가 나도 아래코드까지 실행하므로 리턴을꼭쓰자.
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id }); //exist는 필터가 필요하고 어떤 프로퍼티든 필터가 가능하다. 반면에 findById는 인자로 id가 필요하다. 구분해서 쓰자.
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  } //대문자 비디오는 모델의, 소문자 비디오는 객체의
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags,
    // hashtags: hashtags
    //   .split(",")
    //   .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  //await video.save();
  return res.redirect(`/videos/${id}`); //redirect()는 브라우저가 자동으로 이동하도록 하는것이다.
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  console.log(hashtags);

  try {
    await Video.create({
      title: title, //title(schema형식의): title(req.body의)
      description: description,
      hashtags: hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`)),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "upload Video",
      errorMessage: error._message,
    });
  }
  //await Video.save();
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  console.log(id);
  return res.redirect("/");
};
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
