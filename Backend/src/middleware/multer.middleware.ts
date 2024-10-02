import multer from 'multer';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';




const tempDir = './public/temp';
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });  // Create directory if it doesn't exist
}

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        console.log('Setting destination for file upload');
        cb(null, tempDir);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        console.log(`Saving file as ${file.originalname}`);
        cb(null, file.originalname);
    },
});


export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, //50mb
    },
});