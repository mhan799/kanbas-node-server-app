import "dotenv/config";
import session from "express-session";
import express from 'express';
import mongoose from "mongoose";
//import UserRoutes from "./Kanbas/Users/routes.js";
import UserRoutes from "./Users/routes.js";
import Hello from './Hello.js';
import Lab5 from './Lab5.js';

import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';

import cors from "cors";

const CONNNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
//console.log(CONNNECTION_STRING)
mongoose.connect(CONNNECTION_STRING);//mongodb://localhost:27017
//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
//mongoose.connect("mongodb://localhost:27017/kanbas")
const app = express() 
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
        //origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);
app.use(express.json());
UserRoutes(app)
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)
//app.listen(4000)