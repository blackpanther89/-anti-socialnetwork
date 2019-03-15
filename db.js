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
        `SELECT image_url, firstName, lastName, bio, id FROM users WHERE id = $1`,
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
module.exports.getBioById = function getBioById(id) {
    return db.query(`SELECT bio FROM users WHERE id =$1`, [id]);
};
module.exports.setBio = function setBio(bio, id) {
    return db.query(`UPDATE users SET bio= $1 WHERE id =$2 RETURNING bio`, [bio, id]);
};

module.exports.getInitialStatus = function getInitialStatus(otherUserId, myId) {
    return db.query(`SELECT * FROM friendships
        WHERE receiver =$1 AND sender =$2 OR receiver =$2 AND sender=$1`, [otherUserId, myId]);
};

module.exports.sendFriendRequest = function sendFriendRequest(myId, otherUserId){
    return db.query (`INSERT INTO friendships (receiver, sender)  VALUES ($1, $2) RETURNING *`,[otherUserId, myId]);
};
module.exports.acceptFriendRequest = function acceptFriendRequest(myId, otherUserId){
    return db.query (`UPDATE friendships SET accepted = true WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1) RETURNING *` ,[myId, otherUserId]);
};

module.exports.cancelFriendRequest = function cancelFriendRequest(myId, otherUserId){
    return db.query (`DELETE FROM friendships WHERE (receiver =$1 AND sender =$2) OR (receiver =$2 AND sender =$1)` ,[myId, otherUserId]);

};
module.exports.getFriendsAndWannabes= function getFriendsAndWannabes(myId){
    return db.query (`SELECT users.id  users.firstName,  users.lastName,  users.image_url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver = $1 AND sender = users.id)
    OR (accepted = true AND receiver = $1 AND sender = users.id)
    OR (accepted = true AND sender = $1 AND receiver = users.id)`,[myId]);
};
