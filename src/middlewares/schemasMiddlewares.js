import { baseSchemas } from "../schemas/schemas.js";

async function validateUrlSchema(req, res, next) {
    const { url } = res.locals.body;

    try {
        if (!baseSchemas[url]) {
            return res.status(422).send({ message: "Schema 'url' does not exist" });
        }
    
        const validation = baseSchemas[url].validate(req.body, { abortEarly: false });
    
        if (validation.error) {
            const errors = validation.error.details.map(error => error.message);
            return res.status(422).send({ message: errors });
        }
    
        res.locals.body = req.body;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
}

function schemaValidation (validator) {
    if (!baseSchemas[validator]) {
        return `${validator} does not exist`;
    }

    return async function (req, res, next) {
        const validation = baseSchemas[validator].validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map(error => error.message);
            res.status(422).send({ message: errors });
            return;
        }
    
        res.locals.body = req.body;
        next();
    }
}

export { validateUrlSchema, schemaValidation };