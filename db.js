var spicedPg = require('spiced-pg');
var db = spicedPg(
    process.env.DATABASE_URL ||
    'postgres:postgres:postgres@localhost:5432/wintergreen-socialnetwork',
);

module.exports.register = function register(
    firstName,
    lastName,
    email,
    password,
) {
    return db.query(
        `INSERT INTO users (firstName, lastName, email, password)
    VALUES ($1, $2, $3, $4)  RETURNING id, firstName, lastName`,
        [firstName || null, lastName || null, email || null, password || null],
    );
};

module.exports.login = function login(email) {
    return db.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
};

module.exports.getUserById = function getUserById(id) {
    return db.query(
        `SELECT image_url, firstName, lastName, id FROM users WHERE id = $1`,
        [id],
    );
};
module.exports.userProfilePic = function userProfilePic(
    id, image_url,
) {
    return db.query(
        `UPDATE users SET image_url= $1 WHERE id =$2 `,
        [id, image_url],
    );
};
module.exports.setBio = function setBio( text, id ){
    return db.query( `UPDATE users SET bio= $1 WHERE id =$2`, [text, id])
}
