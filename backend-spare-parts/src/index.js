//dependencies
import express from "express";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
//middlewares
import { corsMiddleware } from "./middlewares/cors.js";
//PORT
import { PORT, SECRET_JWT_KEY } from "./config/config.js";
//routes
import { usersRouter } from "./routes/users.router.js";
import { authRouter } from "./routes/auth.router.js";
import { personalRouter } from "./routes/personal.router.js";
import { toolsRouter } from "./routes/tools.router.js";
import { outToolsRouter } from "./routes/outTools.router.js";

const app = express();

app.disable("x-powered-by");

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());

app.use((req, res, next) => {
    const token = req.cookies.acces_token;
    req.session = { user: null };
    try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data
    } catch { }
    next()
});

//AUTH
app.use('/', authRouter);

//USERS
app.use('/users', usersRouter);

//PERSONAL
app.use('/personal', personalRouter);

//TOOLS
app.use('/tools', toolsRouter);

//OUT TOOLS
app.use('/out-tool', outToolsRouter);


//RUN
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost/${PORT}`);
});