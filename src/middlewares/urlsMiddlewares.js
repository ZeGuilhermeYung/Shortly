import database from "../database/db.js";

async function nonRepeatedUrlValidation(req, res, next) {
    const { url } = res.locals.body;
    const { user } = res.locals;

    try {
        const query = `SELECT * FROM urls WHERE url = $1 and "userId" = $2;`;
        const repeatedUrl = (await database.query(query, [url, user.userId])).rows[0];

        if (!isValidURL(url)) {
            res.status(422).json({ error: "A propriedade 'url' deve ser uma URL válida." });
            return;
        }

        if (repeatedUrl) {
            res.sendStatus(409);
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function userHasUrlValidation(req, res, next) {
    const { user } = res.locals;
    const { id } = req.params;
    if (!id) {
        res.sendStatus(404);
        return;
    }

    try {
        const url = (await database.query(`SELECT * FROM urls WHERE id = $1`, [id])).rows[0];
        if (!url) {
            res.sendStatus(404);
            return;
        }
        
        if (user.userId !== url.userId) {
            res.sendStatus(401);
            return;
        }

        res.locals.urlId = id;
        next();        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

function isValidURL(str) {
    const urlRegex = /^(https?:\/\/)?(((\w([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(str);
}

export {
    nonRepeatedUrlValidation,
    userHasUrlValidation
};