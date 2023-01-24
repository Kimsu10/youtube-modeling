export const homePage = (req, res) => res.render("home"); //home.pug를 렌더링해서 가져온다.
export const search = (req, res) => res.send("Search");
export const see = (req, res) => res.render("watch");

//res.send("See video");
export const edit = (req, res) => res.send("Edit");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
//export default와 각각의 변수를 export하는 것의 차이점
//각각의 변수에 익스포트를 하면 한파일이 여러개를 익스포트할 수 있다.
//이 경우 globalRouter에서 import시 {join}으로 import한다.
//default와 달리 디폴트값이아닌 여러개의 변수로지정되어있어 불러오고싶은 변수를 선언된 변수명 그대로 라우터에 임포트해야한다.

//export default trendingVideos;
// default는 하나의 파일이 하나만 export할 수있다. 내가 원하는 어떤 이름으로든 임포트가 가능하다.
//하나의 파일은 하나의 디폴트 익스포트밖에 가질수 없으므로 nodejs가 defult export를 가지고 자동으로 이름을 바꿔주기때문에
