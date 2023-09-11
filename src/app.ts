import express, { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import path from 'path';

import dotenv from "dotenv";
dotenv.config();

import session from 'express-session';
declare module "express-session" {
    export interface SessionData {
        authenticated: boolean;
        authorized: boolean;
        tokens: {
            access_token?: string;
            refresh_token?: string;
        }
        entree_user: {
            eduPersonAffiliation: string;
            givenName: string;
            sn: string;
            mail: string;
        };
        student?: IStudent;
    }
}

import EntreeAuthenticationManager from "./authentication/entree_authentication_manager";
import { IStudent } from './interfaces/student';
import { Student } from './helpers/student';
import { TimeTableEntry } from './helpers/time_table_entry';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ 
    secret: String(process.env.SESSION_SECRET), 
    resave: true, 
    saveUninitialized: true,
}));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("index", {
        entree_user: req.session.entree_user,
        today: await TimeTableEntry.entriesForDate(req.session.student!.edu_group, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`),
        // today: await TimeTableEntry.entriesForDate(req.session.student!.edu_group, "2023-09-18"),
    });
});

app.get("/agenda", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    // Get current week and redirect to that week
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);

    let days = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let current_week = Math.ceil((days + startDate.getDay() + 1) / 7);

    return res.redirect(`/agenda/${current_week}`);
});

app.get("/agenda/:week", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");
    if(!req.params.week) return res.redirect("/");

    return res.render("agenda", {
        entree_user: req.session.entree_user,
        week: req.params.week,
        classes: await TimeTableEntry.entriesPerWeek(req.session.student!.edu_group, Number.parseInt(req.params.week)),
    });
});

app.get("/messages", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("messages/index");
});

app.get("/messages/create", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("messages/create");
});

app.get("/absence", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("absence/index");
});

app.get("/absence/create", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("absence/create");
});

app.get("/results", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("results");
});

app.get("/profile", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("profile");
});

app.get("/oauth2", async (req: Request, res: Response) => {
    if(req.session.authenticated) {
        return res.redirect("/");
    }
    
    if(!req.session.authorized) {
        let client = await EntreeAuthenticationManager.initializeClient();

        req.session.authorized = true;

        // Redirect to the entree authorization page
        return res.redirect(client.authorizationUrl());
    }
    
    setTimeout(async function() {
        let client = await EntreeAuthenticationManager.initializeClient();
        let tokens = await client.callback(process.env.KN_REDIRECT_URI, { code: req.query.code as string });
        
        if(!tokens || !tokens.access_token || !tokens.refresh_token) {
            // TODO: Redirect to error page
        }

        req.session.tokens = tokens;
        req.session.authenticated = true;

        let entree_user = await client.userinfo(tokens);
        console.log(entree_user);

        req.session.entree_user = {
            eduPersonAffiliation: String(entree_user.eduPersonAffiliation), // Primary user group
            givenName: String(entree_user.givenName), // First name
            sn: String(entree_user.sn), // Last name
            mail: String(entree_user.mail) // Email
        }

        let student: IStudent | null = await Student.createIfNotExists(String(entree_user.mail!).split("@")[0], "GO3E-HSW1");
        req.session.student = student!;

        return res.redirect("/");
    }, 500);

    // TODO: Refresh tokens
});

app.listen(3000, async () => {
    console.log("[INFO] Server gestart op http://localhost:3000");
});