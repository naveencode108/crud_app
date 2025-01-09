import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

import connectDb from './config/db.js';
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    credentials: true
}))

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/todo',todoRoutes);



app.listen(2000, () => {
    console.log('server is running..');
})