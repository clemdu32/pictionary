const jwt = require('jsonwebtoken')
const Party = require('../models/parties')
const Word = require('../models/words')

module.exports = (io) => {
  const parties = {}

  io.on('connection', function (socket) {
    console.log('a new user is connected')
    socket.on('playerConnected', function (data) {
      const token = data.token
      jwt.verify(token, 'privatekey', function (err, authorizedData) {
        const email = authorizedData.email
        Party.findOne({ status: 'Playing...', 'players.player': email }, function (err, party) {
          if (err) console.log(err)
          if (party) {
            socket.join(party._id, function (err) {
              if (err) console.log(err)
              if (parties[party._id] === undefined) {
                parties[party._id] = {}
                parties[party._id].phase = 'Waiting for new players...'
                parties[party._id].words = ['chien', 'chien', 'voiture', 'ciel', 'chat', 'voiture','chien', 'chat', 'voiture', 'voiture']
                parties[party._id].turn = 1
                parties[party._id].numberOfTurn = party.numberOfTurn
                parties[party._id].status = party.status
                parties[party._id]._id = party._id
                parties[party._id].players = party.players
                parties[party._id].creator = party.creator
                console.log(parties)
              }
              if (parties[party._id].phase === 'Waiting for new players...') {
                parties[party._id].players = party.players
              }
              io.to(party._id).emit('updatePartyInfo', parties[party._id])
              socket.on('startParty', function () {
                if (email === parties[party._id].creator) {
                  parties[party._id].phase = 'Drawing...'
                  io.to(party._id).emit('updatePartyInfo', parties[party._id])
                }
              })

              socket.on('wordTest', function (data) {
                const turn = parties[party._id].turn
                if (parties[party._id].turn === parties[party._id].numberOfTurn) {
                  setTimeout(function () {
                    parties[party._id].phase = 'Party Finished'
                    Party.findOneAndUpdate({ _id: party._id }, { status: 'Finished', players: parties[party._id].players }, function (err) {
                      if (err) console.log(err)
                      io.to(party._id).emit('updatePartyInfo', parties[party._id])
                    })
                  }, 3000)
                }
                if (data === parties[party._id].words[turn]) {
                  parties[party._id].turn += 1
                  const playersList = parties[party._id].players
                  const index = playersList.map(function (e) {
                    return e.player
                  }).indexOf(email)
                  playersList[index].score += 1
                  parties[party._id].players = playersList
                  io.to(party._id).emit('wordFound', { word: data, founder: email })
                  io.to(party._id).emit('updatePartyInfo', parties[party._id])
                  setTimeout(function () {
                    io.to(party._id).emit('nextTurn', parties[party._id].turn)
                    io.to(party._id).emit('deleteSketch')
                  }, 5000)
                }
              })

              socket.on('drawing', function (data) {
                socket.broadcast.to(party._id).emit('update', data)
              })

              socket.on('deleteParty', function () {
                if (email === parties[party._id].creator) {
                  delete parties[party._id]
                  Party.findOneAndUpdate({ _id: party._id }, { status: 'Finished' }, function (err) {
                    if (err) console.log(err)
                    socket.broadcast.to(party._id).emit('partyDeleted')
                  })
                }
              })

              socket.on('disconnect', function () {

              })
            })
          }
        })
      })
    })
  })
}
