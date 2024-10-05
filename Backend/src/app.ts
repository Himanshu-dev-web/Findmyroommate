import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db';
import userRouter from './routes/user.routes';
import listingRouter from './routes/listing.routes';
import { ApiError } from './utils/ApiError';

// Load environment variables
dotenv.config({
    path: './env'
});

const app = express();

// CORS Setup
const allowedOrigins = [
    process.env.NEXT_PUBLIC_PROD_URL,
    process.env.NEXT_PUBLIC_BASE_URL,
   
];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            console.log("origin", origin);
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is the home page!');
});

// Route setup
app.use('/api/v1/users', userRouter);
app.use('/api/v1/listings', listingRouter);

// Error handling middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: err.success,
        message: err.message,
        errors: err.errors,
    });
});

// MongoDB connection and server startup
const port = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log(`MongoDB connection failed: ${error}`);
    });
