const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const { sequelize } = require('./models/model');

require('dotenv').config();

// const courseRoutes = require('./routes/course.routes');
// const { verifyToken } = require('./middleware/auth.middleware');

const app = express();
const port = process.env.PORT || 3000;

// const corsOptions = {
//   origin: 'https://your-frontend-domain.com',
//   optionsSuccessStatus: 200
// };
app.use(cors());

app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

pool.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données PostgreSQL :', err);
    return;
  }
  console.log('Connexion réussie à la base de données PostgreSQL');
});

app.use('/auth', authRoutes);
// app.use('/courses', verifyToken, courseRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});


const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion réussie à la base de données PostgreSQL.');

    // Synchroniser tous les modèles
    await sequelize.sync({ force: true });
    console.log('Synchronisation réussie des modèles avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  }
};

syncDatabase();
