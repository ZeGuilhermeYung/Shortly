import database from "../database/db.js";

async function signUp(name, email, passwordHash) {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`;
    return database.query(query, [name, email, passwordHash]);
}

async function signIn(id, token) {
    const query = `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`;
    return database.query(query, [token, id]);
}

async function userExist(email) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    return database.query(query, [email])
}

const authRepository = {
	  signUp,
    userExist,
    signIn
};

export { authRepository };