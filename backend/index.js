const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');
const authRoutes = require('./routes/auth.routes');
const coursRoute = require('./routes/coursRoute');
const leconRoute  = require('./routes/leconRoute')
const inscriptionRoute = require('./routes/inscriptionRoute');
const { sequelize } = require('./models/model');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuration Socket.io
const io = socketIo(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Routes
app.use('/auth', authRoutes);
app.use('/cours', coursRoute);
app.use('/', leconRoute);
app.use('/inscriptions', inscriptionRoute )


// Gestion des salles de réunion
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);

  socket.on('create-room', () => {
    const roomId = crypto.randomUUID();
    const roomPassword = crypto.randomUUID();

    rooms.set(roomId, {
      id: roomId,
      password: roomPassword,
      members: new Set(),
      peers: []
    });

    socket.emit('room-created', { roomId, roomPassword });
  });

  socket.on('join-room', (data) => {
    const { roomId, password, userId } = data;
    const room = rooms.get(roomId);

    if (room && room.password === password) {
      socket.join(roomId);
      room.members.add(userId);
      socket.to(roomId).emit('user-joined', userId);
      socket.emit('join-success', { roomId, members: Array.from(room.members) });
    } else {
      socket.emit('join-error', 'Salle invalide ou mot de passe incorrect');
    }
  });

  socket.on('offer', (data) => {
    const { roomId, offer } = data;
    socket.to(roomId).emit('offer', { offer, senderId: socket.id });
  });

  socket.on('answer', (data) => {
    const { roomId, answer } = data;
    socket.to(roomId).emit('answer', { answer, senderId: socket.id });
  });

  socket.on('ice-candidate', (data) => {
    const { roomId, candidate } = data;
    socket.to(roomId).emit('ice-candidate', { candidate, senderId: socket.id });
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      room.members.delete(socket.id);
      if (room.members.size === 0) {
        rooms.delete(roomId);
      }
    }
    console.log('Client déconnecté:', socket.id);
  });
});

// Initialisation de la base de données
const initializeDatabase = async () => {
  try {
    // Vérifier la connexion
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Synchroniser les modèles sans forcer la réinitialisation
    await sequelize.sync({ force: false, alter: true });
    console.log('Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

// Démarrage du serveur
const startServer = async () => {
  try {
    await initializeDatabase();
    
    server.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion de l'arrêt propre
process.on('SIGTERM', async () => {
  try {
    await sequelize.close();
    server.close(() => {
      console.log('Serveur arrêté proprement');
      process.exit(0);
    });
  } catch (error) {
    console.error('Erreur lors de l\'arrêt du serveur:', error);
    process.exit(1);
  }
});

startServer();