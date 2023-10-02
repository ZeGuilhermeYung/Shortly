import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { authRepository } from "../repositories/authRepository.js";


async function signUp(req, res) {
  const { name, email, password } = res.locals.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 12);

        await authRepository.signUpAuth(name, email, passwordHash);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const { email, password } = res.locals.body;

    try {
        const user = (await authRepository.userExist(email)).rows[0];
        
        if (!user) {
            res.sendStatus(401);
            return;
        }

        const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
        if (!isValidPassword) {
            res.sendStatus(401);
            return;
        }

        const token = uuidv4();

        await authRepository.signInAuth(user.id, token);

        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signUp,
    signIn
};