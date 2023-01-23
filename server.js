import express from "express";
import dotenv from 'dotenv';
import 'express-async-errors';
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRouter.js";
import morgan from "morgan";
import authenticateUser from "./middleware/auth.js";
import cookieParser from 'cookie-parser';

// only when ready to deploy
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
// only when ready to deploy

const app = express();
dotenv.config();

if(process.env.NODE_ENV !== 'production')
{
    app.use(morgan("dev"))
}

app.use(express.json());
app.use(cookieParser());

// only when ready to deploy
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));
// only when ready to deploy

app.get("/", function(req,res) {
    // throw new Error('error');
    res.json({msg:"Hello World"});
});

app.get("/api/v1", function(req,res) {
    // throw new Error('error');
    res.json({msg:"API"});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// only when ready to deploy
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
// only when ready to deploy

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`Sever is listening on port ${port}...`);
        });
    }
    catch (error){
        console.log(error);
    }
}

start();