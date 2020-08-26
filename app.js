import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import { contentSecurityPolicy } from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { localsMiddleware } from './middlewares';
import userRouter from './routers/userRouter'; //userRouter은 default로 export하지 않아서 userRouter 그 하나만 가지고 온것이다. 이때 컬리브라켓을 해준다.
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';

//require 은 첫번째로 express라는 파일을 내 폴더 안에서 찾을 것이고 못찾으면 각 파일 속, 지금 같은 경우에는 node_modules부터 다 뒤지기 시작한다.

const app = express();
//express를 실행하여 변수 app 에 할당함.
// const PORT = 4000;
app.set('view engine', 'pug');

// const handleListening = () => console.log(`listening on: http://localhost:${PORT}`);
//GET request는 정보를 전달 X , post 는 가능.

//이 함수들은 두가지 인자 request object(누가 어떤 종류의 데이터가 페이지로 전송됐는지)와 response object(아이디와 패스워드를 서버로 보낼때)를 호출함
// 웹페이지처럼 작동을 원한다면 단순히 res.send로 메세지를 호출하는 것이 아닌 html파일을 호출해야한다. 단지 이러한 작동방식으로 동작한다는 것을 알면 됨.
// const handleHome = (req, res) => res.send('hello from my ass');
// const handleProfile = (req, res) => res.send('You are on my profile');

//express에서 route나 connection을 다루는 모든 함수들은 req, res, next 오브젝트를 포함한다.
//next는 응답을 받게끔 허가해주는 역할.

// const betweenHome = (req, res, next) => {
//   console.log(" I'm between");
//   next();
// }
//middleware의 순서가 중요하다. 아래의 코드를 / 와 /profile 사이에 두면 또 다르게 동작한다. 맨 위에 놔야지만 서버가 시작할 때 위에서부터 아래로 코드를 쫙 훑으면서 middleware를 먼저 받고 그다음 route를 처리할 수 있게 한다.
//아래 middleware는 전역 함수로 사용됨.
// app.use(betweenHome);

//get request를 보내면 response를 해야함.
// 아래의 betweenHome은 /:request와 handleHome: response사이에 있는 middleware라고 한다.
//아래의 middleware 사용은 local 함수로 사용된 것이다.
// app.get("/", betweenHome, handleHome);
app.use(helmet({ contentSecurityPolicy }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//만약 middleware 가 next함수가 아닌 res.send를 보내게 된다면 연결을 중간에 끊을 수 있다.
// const middleware = (req, res, next) => {
//   res.send('not happening');
// }
// app.get("/", middleware, handleHome);


// app.get("/", handleHome);

// app.get('/profile', handleProfile);

app.use(localsMiddleware)

//use의 의미는 누가 /user로 접속했다면 이 router전체를 사용하겠다는 의미.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// app.listen(PORT, handleListening);

export default app;