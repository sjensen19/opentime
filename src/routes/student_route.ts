import express, { Request, Response, Router } from "express";
import { TimeTable } from "../helpers/time_table";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("index", {
        entree_user: req.session.entree_user,
        today: await TimeTable.entriesForDate(req.session.student!.edu_group, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`),
        // today: await TimeTableEntry.entriesForDate(req.session.student!.edu_group, "2023-09-18"),
    });
});

router.get("/agenda", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    // Get current week and redirect to that week
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);

    let days = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let current_week = Math.ceil((days + startDate.getDay() + 1) / 7);

    return res.redirect(`/agenda/${current_week}`);
});

router.get("/agenda/:week", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");
    if(!req.params.week) return res.redirect("/");

    return res.render("agenda", {
        entree_user: req.session.entree_user,
        week: req.params.week,
        classes: await TimeTable.entriesPerWeek(req.session.student!.edu_group, Number.parseInt(req.params.week)),
    });
});

router.get("/messages", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.redirect("https://www.outlook.com");
});

router.get("/absence", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("absence/index", {
        entree_user: req.session.entree_user,
    });
});

router.get("/absence/create", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("absence/create", {
        entree_user: req.session.entree_user,
    });
});

router.get("/results", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("results", {
        entree_user: req.session.entree_user,
    });
});

router.get("/profile", async (req: Request, res: Response) => {
    if(!req.session.authenticated) return res.redirect("/oauth2");

    return res.render("profile");
});

export default router;