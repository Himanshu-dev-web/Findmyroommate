import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

// define some middlewares

const allowedOrigins = [
    process.env.NEXT_PUBLIC_PROD_URL,
    process.env.NEXT_PUBLIC_BASE_URL,
    
     'http://localhost:3000' // for development mode in Next.js
]

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            console.log("origin", origin)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json({
    limit: '50mb'
}));

app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}))
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log("yelo", process.env.NEXT_PUBLIC_PROD_URL,process.env.NEXT_PUBLIC_BASE_URL)
    res.send('Hello, this is the home page!');
});

// declare routes and attach routers

import userRouter from './routes/user.routes';
import listingRouter from './routes/listing.routes';
import { ApiError } from './utils/ApiError';

app.use('/api/v1/users', userRouter)
app.use('/api/v1/listings', listingRouter)

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: err.success,
        message: err.message,
        errors: err.errors,
    });
});

export { app }

