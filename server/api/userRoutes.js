const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Party = require('../models/parties');

module.exports = (app, io) => {

    let parties = {};

    newParty = (partyId)=>{
        Party.findById(partyId,function (err, party) {
            parties[partyId]=party;
            console.log(partyId + ' added to playing parties');
            console.log(parties);
        });
    };

    io.on('connection', function(socket) {
        console.log('a new user is connected');
        socket.on('playerConnected', function (data) {
            const token = data.token;
            jwt.verify(token, 'privatekey', function (err, authorizedData){
                const email = authorizedData.email;
                Party.findOne({status : "Playing...", "players.player":email },function (err, party) {
                    if (party){
                        socket.join(party._id, function (err) {
                            console.log('Player join the room');
                            socket.broadcast.to(party._id).emit('message', email + ' has joined the party');
                            socket.broadcast.to(party._id).emit('updatePartyInfo');

                            socket.on('drawing', function (data) {
                                socket.broadcast.to(party._id).emit('update', data);
                            });
                            socket.on('partyStarted', function (data) {

                            });
                            socket.on('disconnect', function() {
                                io.to(party._id).emit('updatePartyInfo');
                                console.log(email + ' has disconnected');
                            });
                        });
                    }
                });

            });
        });
    });

    app.post('/login', (req, res, next) => {
        const { body } = req;
        const email = body.email;
        const pwd = body.pwd;

        User.findOne({email:email},function (err,user) {
            if (err) return console.error(err);
            else{
                //checking to make sure the user entered the correct username/password combo
                if(user.email === email && user.pwd === pwd) {
                    //if user log in success, generate a JWT token for the user with a secret key
                    const pseudo = user.pseudo;
                    const adminRights = user.isAdmin;
                    jwt.sign({email, pseudo, adminRights}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                        if(err) { console.log(err) }
                        console.log(token);
                        res.json({token:token});
                    });
                } else {
                    console.log('ERROR: Could not log in');
                }
            }

        });
    });

    //This is a protected route
    app.get('/user/gamestatus', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if(err){
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                Party.findOne({status : "Playing...", "players.player":authorizedData.email },function (err, partie) {
                    if(err) {
                        //If error send Forbidden (403)
                        console.log('ERROR: Could not create new party');
                        res.status(403);
                    }
                    else {
                        console.log(partie);
                        if (partie){
                            res.json({
                                isPlaying: true,
                                partyId: partie._id,
                                party: partie
                            });
                            console.log('Player is playing');
                        }
                        else{
                            res.json({
                                isPlaying: false,
                                partyId:0
                            });
                            console.log('Player is not playing');
                        }
                    }
                });
            }
        })
    });

    app.get('/user/leaveparty', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if (err) {
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                Party.findOne({status: "Playing...", "players.player":authorizedData.email}, function (err, partie) {
                    if (err) {
                        //If error send Forbidden (403)
                        console.log('ERROR');
                        res.status(403);
                    } else {
                        if (partie != null){
                            let playersList = partie.players;
                            let status = partie.status;
                            playersList.splice(playersList.indexOf({player: authorizedData.email}), 1);
                            if (partie.creator === authorizedData.email){
                                status = 'Finished';
                            }
                            Party.findOneAndUpdate({_id: partie._id}, {status: status, players: playersList}, function (err) {
                                if (err) {
                                    console.log("ERROR");
                                    res.json({
                                        message: "You cannot leave the party"
                                    })
                                } else {
                                    console.log("SUCCESS");
                                    res.json({
                                        message: "You leave the party"
                                    })
                                }
                            });
                        }
                    }
                })
            }
        });
    });

    app.post('/newparty', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not create new party');
                res.status(403);
            } else {
                //If token is successfully verified, we can send the autorized data
                const newParty = new Party({
                    start: Date.now(),
                    numberOfTurn: req.body.numberOfTurn,
                    status : 'Playing...',
                    creator: authorizedData.email,
                    players: [{player : authorizedData.email, score: 0}]
                });

                newParty.save(function (err) {
                    if (err) return console.error(err);
                    console.log(newParty.creator + " has created a new party");
                    res.status(200).json({message: "You have created a new party"});
                    console.log('SUCCESS: A new party has been created');
                });
            }
        })
    });


    app.get('/user/joinparty/:partyId', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not join new party');
                res.status(403);
            } else {
                //If token is successfully verified, we can send the autorized dat
                const partyId = req.params['partyId'];
                console.log(partyId);
                Party.findOne({_id: partyId}, function (err, partie) {
                    if (err) {
                        //If error send Forbidden (403)
                        console.log('ERROR');
                        res.status(403);
                    } else {
                        if (partie != null){
                            let playersList = partie.players;
                            playersList.push({player : authorizedData.email, score : 0});
                            Party.findOneAndUpdate({_id: partie._id}, {players: playersList}, function (err) {
                                if (err) {
                                    console.log("ERROR");
                                    res.json({
                                        message: "Party not joined"
                                    })
                                } else {
                                    console.log("SUCCESS");
                                    res.json({
                                        message: "Party joined"
                                    })
                                }
                            });
                        }
                    }
                })
            }
        })
    });


    app.get('/party/:partyId', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not join new party');
                res.status(403);
            } else {
                //If token is successfully verified, we can send the autorized dat
                const partyId = req.params['partyId'];
                Party.findOne({_id: partyId}, function (err, party) {
                    if (err) {
                        //If error send Forbidden (403)
                        console.log('ERROR');
                        res.status(403);
                    } else {
                        res.json({
                            party: party
                        });
                    }
                })
            }
        })
    });

    app.get('/parties', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.headers['authorization'], 'privatekey', (err, authorizedData) => {
            if(err){
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                Party.find({status: "Playing..."}, function (err, parties) {
                    res.json({
                        message: 'Successful log in',
                        parties
                    });
                    console.log('SUCCESS: all parties');
                });
            }
        })
    });

};

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}