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
        };
    }
}

import EntreeAuthenticationManager from "./authentication/entree_authentication_manager";

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

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("index");
});

app.get("/agenda", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("agenda");
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
        return res.redirect(client.authorizationUrl());
    }

    if(req.query.code) {
        let client = await EntreeAuthenticationManager.initializeClient();
        let tokens = await client.callback(process.env.KN_REDIRECT_URI, { code: req.query.code as string });
        
        req.session.tokens = tokens;
        req.session.authenticated = true;

        let entree_user = await client.userinfo(tokens);
        
        req.session.entree_user = {
            eduPersonAffiliation: String(entree_user.eduPersonAffiliation),
            givenName: String(entree_user.givenName),
            sn: String(entree_user.sn)
        }

        return res.redirect("/");
    }

    return res.redirect("/");
});

app.listen(3000, async () => {
    console.log("[INFO] Server gestart op http://localhost:3000");
});