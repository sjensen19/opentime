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
import studentRouter from './routes/student_route';
import opRouter from './routes/op_route';

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

app.use("/", studentRouter);
app.use("/op", opRouter);

app.listen(3000, async () => {
    console.log("[INFO] Server gestart op http://localhost:3000");
});