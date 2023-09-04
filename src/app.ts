import express, { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';

import dotenv from "dotenv";
dotenv.config();

import session from 'express-session';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ 
    secret: String(process.env.SESSION_SECRET), 
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req: Request, res: Response) => {
    return res.render("index");
});

app.get("/agenda", async (req: Request, res: Response) => {
    return res.render("agenda");
});

app.get("/messages", async (req: Request, res: Response) => {
    return res.render("messages/index");
});

app.get("/messages/create", async (req: Request, res: Response) => {
    return res.render("messages/create");
});

app.get("/absence", async (req: Request, res: Response) => {
    return res.render("absence/index");
});

app.get("/absence/create", async (req: Request, res: Response) => {
    return res.render("absence/create");
});

app.get("/results", async (req: Request, res: Response) => {
    return res.render("results");
});

app.get("/profile", async (req: Request, res: Response) => {
    return res.render("profile");
});

app.listen(3000, async () => {
    console.log("[INFO] Server gestart op http://localhost:3000");
});