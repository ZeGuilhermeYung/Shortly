import database from "../database/db.js";

async function signUp(name, email, passwordHash) {
    const query = `INSERT INTO users (name, email, "passwordHash") VALUES ($1, $2, $3);`;
    return database.query(query, [name, email, passwordHash]);
}

async function signIn(id, token) {
    const query = `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`;
    return database.query(query, [id, token]);
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