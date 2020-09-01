//보통 application을 만들고 init에 export하여 init에서 서버를 연다고 함.
import './db'
import app from './app';
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";


const PORT = process.env.PORT || 4000;


const hanldeListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`)


app.listen(PORT, hanldeListening);