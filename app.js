import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import { contentSecurityPolicy } from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from "connect-mongo";
import { localsMiddleware } from './middlewares';
import userRouter from './routers/userRouter'; //userRouter은 default로 export하지 않아서 userRouter 그 하나만 가지고 온것이다. 이때 컬리브라켓을 해준다.
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';

import './passport';

//require 은 첫번째로 express라는 파일을 내 폴더 안에서 찾을 것이고 못찾으면 각 파일 속, 지금 같은 경우에는 node_modules부터 다 뒤지기 시작한다.
const app = express();
//express를 실행하여 변수 app 에 할당함.
// const PORT = 4000;
app.use(helmet());
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

//use의 의미는 누가 /user로 접속했다면 이 router전체를 사용하겠다는 의미.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// app.listen(PORT, handleListening);

export default app;