const express = require('express')
const path = require('path')

const app = express()
const socketio = require('socket.io')

const { runner } = require('./lib')

app.use(express.static(path.join(__dirname, 'public')))

app.post('/game', async(req, res) => {
  res.send(await runner.start())
})

app.get('/game', async(req, res) => {
  res.send(await runner.getActiveGame())
})

app.post('/game/iteration', async(req, res) => {
  res.send(await runner.iterate())
})

app.get('/game/state', async(req, res) => {
  res.send(await runner.getState())
})

const server = app.listen(3000, () => console.log('App listening on port 3000.'))

const io = socketio(server)

io.on('connection', (socket) => {
  socket.on('start game', async(cb) => {
    cb(await runner.start())
  })

  socket.on('iterate game', async(cb) => {
    cb(await runner.iterate())
  })
})
