import database from "../database/db.js";

function insertUrl(url, shortUrl, userId) {
  return database.query(
    `
    INSERT INTO
        urls(url, "shortUrl", "createdBy")
    VALUES 
        ($1, '${shortUrl}', '${userId}');
    `,
    [url]
  );
}

async function getUrlById(urlId) {
  const url = await database.query(
    `
    SELECT
        id, "shortUrl", url
    FROM
        urls
    WHERE
        id = $1;
    `,
    [urlId]
  );

  return url.rows[0];
}

async function getUrlByShortened(shortUrl) {
  const url = await database.query(
    `
    SELECT
        id, url
    FROM
        urls
    WHERE
        "shortUrl" = $1;
    `,
    [shortUrl]
  );

  return url.rows[0];
}

function updateUrl(urlId) {
  return database.query(
    `
    UPDATE
        urls
    SET
        "visitCount" = "visitCount" + 1
    WHERE
        id = $1;
    `,
    [urlId]
  );
}

async function getUrlOwner(urlId) {
  const urlOwner = await database.query(
    `
    SELECT
        "createdBy"
    FROM
        urls
    WHERE
        id = $1;
    `,
    [urlId]
  );

  return urlOwner.rows[0]?.createdBy;
}

function deleteUrl(urlId) {
  return database.query(
    `
    DELETE FROM
        urls
    WHERE
        id = $1;
    `,
    [urlId]
  );
}

export const urlsRepository = {
  insertUrl,
  getUrlById,
  getUrlByShortened,
  updateUrl,
  getUrlOwner,
  deleteUrl,
};