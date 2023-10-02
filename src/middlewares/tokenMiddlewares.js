import jwt from "jsonwebtoken";
import database from "../database/db.js";

async function authValidation(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        res.sendStatus(401);
        return;
    }
    let user;

    try {
        user = jwt.verify(token, process.env.TOKEN_SECRET);

    } catch (error) {
        res.sendStatus(404);
        return;
    }

    try {
        
        const session = (await database.query(`SELECT * FROM sessions WHERE token = $1 AND "userId" = $2;`,[
            user.userId,
            token
        ])).rows[0];

        if (!session) {
            res.sendStatus(404);
            return;
        }

        res.locals.user = user;
        next();        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { authValidation };