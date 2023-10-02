import database from "../database/db.js";

async function postShortUrl(id, url, shortUrl) {
    const query = `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl";`;
    return database.query(query, [id, url, shortUrl]);
}

async function getUrl(id) {
    const query = `SELECT id, "shortUrl", url FROM urls WHERE id = $1;`;
    return database.query(query, [id]);
}

async function getShortUrl(shortUrl) {
    const query = `SELECT id, url, "visitCount" FROM urls WHERE "shortUrl" = $1;`;
    return database.query(query, [shortUrl]);
}

async function updateVisitCount(visitCount, id) {
    const query = `UPDATE urls SET "visitCount" = $1 WHERE id = $2;`;
    return database.query(query, [visitCount, id]);
}

async function deleteUrl(id) {
    const query = `DELETE FROM urls WHERE id = $1;`;
    return database.query(query, [id]);
}

const urlRepository = {
	postShortUrl,
    getUrl,
    getShortUrl,
    updateVisitCount,
    deleteUrl
};

export { urlRepository };