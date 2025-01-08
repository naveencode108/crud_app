import 'dotenv/config';

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

import connectDb from './config/db.js';
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes)



app.listen(2000, () => {
    console.log('server is running..');
})