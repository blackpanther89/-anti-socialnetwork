const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const bcrypt = require('./bcrypt');
const db = require('./db');
const csurf = require('csurf');
const s3 = require('./s3');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
//============================================================================//
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
//============================================================================//
app.use(bodyParser.json());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    }),
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});
app.use(express.static('./public'));

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/',
        }),
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
//============================================================================//

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//============================================================================//

app.post('/registration', (req, res) => {
    console.log('req.body:', req.body);
    bcrypt.hashPassword(req.body.password).then(hash => {
    // console.log('hash:', hash);
        db
            .register(req.body.firstName, req.body.lastName, req.body.email, hash)
            .then(results => {
                console.log('results in register', results);

                req.session.firstName = req.body.firstName;
                req.session.lastName = req.body.lastName;
                req.session.email = req.body.email;
                req.session.userId = results.rows[0].id;
                // console.log(req.session);
                res.json({success: true});
            })
            .catch(err => {
                res.json({error: true});
            });
    });

    // console.log('error:', error);
});
//============================================================================//
app.post('/login', (req, res) => {
    console.log('req.body', req.body);

    db.login(req.body.email).then(results => {
        console.log('results in log in', results );
        bcrypt
            .checkPassword(req.body.password, results.rows[0].password)
            .then(match => {
                if (match) {
                    req.session.userId = results.rows[0].id;
                    console.log(req.session.userId);
                    res.json({success: true});
                } else {
                    res.json({error: true});
                }
            })
            .catch(err => {
                res.json({error: true});
            })
            .catch(err => {
                res.json({error: true});
            });
    });
});
//===========================================================================//
function requireLoggedInUser(req, res, next) {
    console.log('req.session',req.session);
    if (!req.session.userId) {
        res.sendStatus(403);
    } else {
        next();
    }
}
//============================================================================//
app.get('/user', requireLoggedInUser, (req, res) => {
    console.log('hello');
    db.getUserById(req.session.userId).then(data => {
        console.log('rows in getUserById: ', data);

        const user = data.rows.pop();
        console.log("user", user);
        if (!user.image_url) {
            user.image_url = './default.png';
        }
        console.log('results', data.rows);
        res.json(user);
    });
});
//============================================================================//
app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    // console.log('req.file', req.file);
    if (req.file) {
        let image_url = 'https://s3.amazonaws.com/spicedling/' +
            req.file.filename;

        db.userProfilePic( image_url, req.session.userId).then(results => {
            res.json(results.rows);
        });
    } else {
        res.json({
            success: false,
        });
    }
});
//============================================================================//
app.get('/bio', (req, res) => {
    db.getBioById(req.session.userId).then(results=>{
        console.log('results in setBio', results);
        res.json(results);
    }).catch(error => {
        console.log('error',error);
        res.json({error: true});
    });
});

app.post('/bio',(req, res)=> {
    console.log('req.body', req.body);
    db.setBio( req.body.bio,req.session.userId).then(results=>{
        console.log('results', results);
        res.json(results.rows[0].bio);
    });
});

//============================================================================//
app.get('/users/:id',( req, res)=>{
    console.log('id', req.params.id);
    if(req.params.id == req.session.userId){
        res.json({match:true});
    }else{

        db.getUserById(req.params.id).then(data=>{
            console.log("data in getsuserapi", data);
            res.json(data.rows[0]);
        });
    }
});
//============================================================================//
app.get('/get-initial-status/:otherUserId', (req, res)=>{
    console.log('GET /get-initial-status running');
    db.getInitialStatus(req.params.otherUserId, req.session.userId).then(data=>{
        res.json(data);
    });


});

//============================================================================//
app.post('/send-friend-request/:id',(req, res)=>{
    // console.log('/send-friend-request/:id eeeeeeeee', );
    const myId =  req.session.userId;
    const otherUserId = req.params.id;
    db.sendFriendRequest( myId , otherUserId).then(data=>{
        res.json({success:true, data: data.rows[0]});
    });
});
app.post('/accept-friend-request/:id',(req, res)=>{
    // console.log('/accept-friend-request');
    const myId =  req.session.userId;
    console.log('myId', myId);
    // console.log('otherUserId', otherUserId);
    const otherUserId = req.params.id;
    db.acceptFriendRequest(myId , otherUserId).then(data=>{
        res.json({success:true, data: data.rows[0]});
    });
});
app.post('/cancel-friend-request/:id',(req, res)=>{
    console.log('/cancel-friend-request');
    const myId =  req.session.userId;
    console.log('myid', myId);
    // const otherUserId = req.params.id;
    // console.log('otherUserId', otherUserId);
    db.cancelFriendRequest(myId).then(()=>{
        res.json({success:true});

    });
});
//============================================================================//
app.get('/get-friends-and-wannabes',(req,res)=>{
    const myId= req.session.userId;
    console.log('hello bitches from getFriendsAndWannabes');
    db.getFriendsAndWannabes(myId).then(data=>{
        console.log('data in getFriendsAndWannabes', data);
        res.json({data});
    }).catch(error => {
        console.log('error',error);
        res.json({error: true});
    });
});
//============================================================================//
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
//============================================================================//
app.listen(8080, function() {
    console.log("I'm listening.");
});
