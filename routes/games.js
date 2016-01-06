'use strict'

const express = require('express')
const path = require('path')

const Game = require('../models/game')
const router = express.Router()

let renderGames = (req, res) => {
  Game.find({}, (error, results) => {
    if (error) throw error
    res.json(results)
    // res.render('games', { games: results })
  })
}

let respondWithErrors = (err, res) => {
  if (err) {
    let message = {}
    message.header = err.message
    message.errors = []
    for (let key in err.errors) {
      message.errors.push(err.errors[key].message)
    }
    res.send(message)
  } else res.end()
}

let createDocument = source => {
  let doc = {}
  if (source._id) doc._id = source._id
  const keys = [ 'sport', 'homeTeam', 'awayTeam', 'homeScore', 'awayScore', 'date', 'played' ]
  keys.forEach(element => {
    doc[element] = source[element]
  })

  return doc
}

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'games.html'))
})

router.get('/list', (req, res, next) => {
  Game.find({}, (error, results) => {
    if (error) throw error
    res.json(results)
  })
})

router.get('/:id', (req, res, next) => {
  Game.findOne({ _id: req.params.id }, (err, results) => {
    if (err) throw err
    let game = createDocument(results)
    res.render('game', { game })
  })
})

router.post('/', (req, res, next) => {
  let game = new Game(createDocument(req.body))
  game.save(err => {
    if (err) throw err
    res.json(game)
  })
  // game.save(err => {
  //   respondWithErrors(err, res)
  // })
})

router.put('/:id', (req, res, next) => {
  let updatedDoc = createDocument(req.body)
  Game.update({ _id: req.params.id }, updatedDoc, { runValidators: true }, err => {
    respondWithErrors(err, res)
  })
})

router.delete('/:id', (req, res, next) => {
  Game.findByIdAndRemove(req.params.id, err => {
    if (err) throw err
    res.end()
  })
})

module.exports = router
