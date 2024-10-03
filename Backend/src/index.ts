import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db";

dotenv.config({
  path: '../env'
})

const port = 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: hi Server is running at http://localhost:${port}`);
    });
  }).catch((error) => {
    console.log(`mongodb connection failed ${error}`)
  })


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

