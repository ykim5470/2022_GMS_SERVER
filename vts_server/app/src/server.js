'use strict'

require('dotenv').config

const { Server } = require('socket.io')
const http = require('http')
const https = require('https')
const compression = require('compression')
const express = require('express')
const session= require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const path = require('path')
const { sequelize } = require('../../models')
const apiHandler = require('./apis/index')
const app = express()


const Logger = require('./helpers/Logger')
const log = new Logger('server')


const SequelizeStore = require('connect-session-sequelize')(session.Store)
const port = process.env.PORT || 5000 
const isHttps = process.env.NODE_ENV === 'production' ? false : true   

let io, server, host

if (isHttps) {
  const fs = require('fs')
  const options = {
    key: fs.readFileSync(
      path.join(__dirname, '../ssl/enjoystreet.kr_2022041891003.key.pem'),
      'utf-8',
    ),
    cert: fs.readFileSync(
      path.join(__dirname, '../ssl/enjoystreet.kr_2022041891003.ca-bundle.pem'),
      'utf-8',
    )
  }

  server = https.createServer(options, app)
  host = 'https://' + 'localhost' + ':' + port
} else {
  server = http.createServer(app)
  host = 'https://' + 'localhost' + ':' + port
}

io = new Server({
  maxHttpBufferSize: 1e7,
  pingTimeout: 60000,
  cors: {
    origin: 'https://dev.enjoystreet.kr',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
  ws: true
}).listen(server)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(err)
  })

const { swaggerUi, swaggerJsDoc } = require('../api/swagger')


const apiBasePath = '/api/v1' 
const api_docs = host + apiBasePath + '/docs' 
let channels = {} 
let sockets = {} 
let peers = {} 

app.use(
  session({
    resave: false,
    saveUninitialized: true, 
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, 
      secure: false, 
      maxAge: 2000 * 60 * 60 // 2 hour
    },
    store: new SequelizeStore({
      db: sequelize
    })
  })
)
app.use(cookieParser())
app.use(cors()) 
app.use(compression())
app.use(express.json()) 
app.use(passport.initialize()) 
app.use(passport.session()) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc)) 
app.use('/uploads', express.static(path.join(__dirname + '/middle/uploads/GUIDE/streaming/live/thumbnailSource/')))
app.set('io', io); 
app.use('/', apiHandler)



const iceServers = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun3.l.google.com:19302',
      'stun:stun4.l.google.com:19302',
    ],
  },
]

server.listen(port, () => {
	console.log('server is runnning...')
})


io.sockets.on('connect', (socket) => {
  log.debug('[' + socket.id + '] connection accepted')

  

  socket.channels = {}
  sockets[socket.id] = socket

  socket.on('disconnect', (reason) => {
    console.log('이건 소켓 채널')
    console.log(socket.channels)
    for (let channel in socket.channels) {
      console.log('방')
      console.log(channel)
      removePeerFrom(channel)
    }
    delete sockets[socket.id]
  })

  socket.on('join', (config) => {
    let channel = config.channel
    let peer_name = config.peer_name
    let peer_role = config.peer_role
    let peer_video = config.peer_video
    let peer_audio = config.peer_audio
    let peer_hand = config.peer_hand
    let peer_rec = config.peer_rec

    if (channel in socket.channels) {
      return
    }
    if (!(channel in channels)) channels[channel] = {}

    if (!(channel in peers)) peers[channel] = {}

    if (peers[channel]['Locked'] === true) {
      socket.emit('roomIsLocked')
      return
    }

    peers[channel][socket.id] = {
      peer_name: peer_name,
      peer_role: peer_role,
      peer_video: peer_video,
      peer_audio: peer_audio,
      peer_hand: peer_hand,
      peer_rec: peer_rec,
    }

    addPeerTo(channel)

    channels[channel][socket.id] = socket
    socket.channels[channel] = channel
  })

  socket.on('chatting', (config) =>{
	const {channel, peer_id, msg} = config 
  for(let id in channels[channel]) {
    if(id !== peer_id){
      channels[channel][id].emit('receiveChat', {from: peer_id, msg: msg})
    }
    }
  })


  function addPeerTo(channel) {
    let host_socket_obj = channels[channel]
    let host_socket_id = Object.keys(host_socket_obj)[0]
    let host_socket_instance = host_socket_obj[host_socket_id]

    if (host_socket_instance !== undefined) {
      host_socket_instance.emit('addPeer', {
        peer_id: socket.id,
        peers: peers[channel],
        should_create_offer: true,
        iceServers: iceServers,
      })
      socket.emit('addPeer', {
        peer_id: host_socket_id,
        peers: peers[channel],
        should_create_offer: false,
        iceServers: iceServers,
      })
    }
  }


  async function removePeerFrom(channel) {
    if (!(channel in socket.channels)) {
      return
    }

    delete socket.channels[channel]
    delete channels[channel][socket.id]
    delete peers[channel][socket.id]

    switch (Object.keys(peers[channel]).length) {
      case 0:
        delete peers[channel]
        break
      case 1:
        if ('Locked' in peers[channel]) delete peers[channel]
        break
    }

    console.log('여기 타고 와서 삭제를 하는데')
    for (let id in channels[channel]) {
      console.log('전체 채널에 특정 채널 id에 remove peer 이벤트 보냄, config는 socket.id이다. 그냥 id를 보내야 하나?')
      console.log(id)
      console.log('이거 보니까 removePeer가 두개 있다. 하나는 host에 보내고 하나는 자신 제외 peer에 보내는 듯 한데?')
      console.log('이건 channels[channel][id]에 보내는 것. socket.id를 config로 보냄')
      console.log(channels[channel][id])
      await channels[channel][id].emit('removePeer', { peer_id: socket.id })
      console.log('이건 socket에 보내는 것. id를 config로 보냄')
      socket.emit('removePeer', { peer_id: id })
    }
  }

  socket.on('relayICE', (config) => {
    let peer_id = config.peer_id
    let ice_candidate = config.ice_candidate

    sendToPeer(peer_id, sockets, 'iceCandidate', {
      peer_id: socket.id,
      ice_candidate: ice_candidate,
    })
  })

  socket.on('relaySDP', (config) => {
    let peer_id = config.peer_id
    let session_description = config.session_description

    sendToPeer(peer_id, sockets, 'sessionDescription', {
      peer_id: socket.id,
      session_description: session_description,
    })
  })

  socket.on('roomStatus', (config) => {
    let room_id = config.room_id
    let room_locked = config.room_locked
    let peer_name = config.peer_name

    peers[room_id]['Locked'] = room_locked


    sendToRoom(room_id, socket.id, 'roomStatus', {
      peer_name: peer_name,
      room_locked: room_locked,
    })
  })


  socket.on('peerName', (config) => {
    let room_id = config.room_id
    let peer_name_old = config.peer_name_old
    let peer_name_new = config.peer_name_new
    let peer_id_to_update = null

    for (let peer_id in peers[room_id]) {
      if (peers[room_id][peer_id]['peer_name'] == peer_name_old) {
        peers[room_id][peer_id]['peer_name'] = peer_name_new
        peer_id_to_update = peer_id
      }
    }

    if (peer_id_to_update) {

      sendToRoom(room_id, socket.id, 'peerName', {
        peer_id: peer_id_to_update,
        peer_name: peer_name_new,
      })
    }
  })




  socket.on('kickOut', (config) => {
    let room_id = config.room_id
    let peer_id = config.peer_id
    let peer_name = config.peer_name

    log.debug(
      '[' +
        socket.id +
        '] kick out peer [' +
        peer_id +
        '] from room_id [' +
        room_id +
        ']',
    )

    sendToPeer(peer_id, sockets, 'kickOut', {
      peer_name: peer_name,
    })
  })


  socket.on('fileInfo', (config) => {
    let room_id = config.room_id
    let peer_name = config.peer_name
    let file = config.file

    function bytesToSize(bytes) {
      let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes == 0) return '0 Byte'
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }

    file['peerName'] = peer_name

    log.debug(
      '[' +
        socket.id +
        '] Peer [' +
        peer_name +
        '] send file to room_id [' +
        room_id +
        ']',
      {
        peerName: file.peerName,
        fileName: file.fileName,
        fileSize: bytesToSize(file.fileSize),
        fileType: file.fileType,
      },
    )

    sendToRoom(room_id, socket.id, 'fileInfo', file)
  })


  socket.on('fileAbort', (config) => {
    let room_id = config.room_id
    let peer_name = config.peer_name

    log.debug(
      '[' +
        socket.id +
        '] Peer [' +
        peer_name +
        '] send fileAbort to room_id [' +
        room_id +
        ']',
    )
    sendToRoom(room_id, socket.id, 'fileAbort')
  })

  socket.on('videoPlayer', (config) => {
    let room_id = config.room_id
    let peer_name = config.peer_name
    let video_action = config.video_action
    let video_src = config.video_src
    let peer_id = config.peer_id

    let sendConfig = {
      peer_name: peer_name,
      video_action: video_action,
      video_src: video_src,
    }
    let logme = {
      peer_id: socket.id,
      peer_name: peer_name,
      video_action: video_action,
      video_src: video_src,
    }

    if (peer_id) {
      log.debug(
        '[' +
          socket.id +
          '] emit videoPlayer to [' +
          peer_id +
          '] from room_id [' +
          room_id +
          ']',
        logme,
      )

      sendToPeer(peer_id, sockets, 'videoPlayer', sendConfig)
    } else {
      log.debug(
        '[' + socket.id + '] emit videoPlayer to [room_id: ' + room_id + ']',
        logme,
      )

      sendToRoom(room_id, socket.id, 'videoPlayer', sendConfig)
    }
  })


  socket.on('wbCanvasToJson', (config) => {
    let room_id = config.room_id
    sendToRoom(room_id, socket.id, 'wbCanvasToJson', config)
  })



  socket.on('chat', (data, callback)=>{
  return callback(data)
  })

  socket.on('whiteboardAction', (config) => {
    log.debug('Whiteboard', config)
    let room_id = config.room_id
    sendToRoom(room_id, socket.id, 'whiteboardAction', config)
  })

  socket.on('likeAdd', (data)=>{
    const {currentLikeCount, roomId} = data
    let addedLikeCount = currentLikeCount +1
    io.sockets.emit('addedLikeCount',addedLikeCount)
  })

}) 


async function sendToRoom(room_id, socket_id, msg, config = {}) {
  for (let peer_id in channels[room_id]) {
    if (peer_id != socket_id) {
      await channels[room_id][peer_id].emit(msg, config)
    }
  }
}


async function sendToPeer(peer_id, sockets, msg, config = {}) {
  if (peer_id in sockets) {
    await sockets[peer_id].emit(msg, config)
  }
}
