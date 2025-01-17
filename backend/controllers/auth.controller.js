const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Utilisateur } = require('../models/model');

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, langue_maternelle, niveau_langue, role } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const utilisateur = await Utilisateur.create({ 
      nom, 
      prenom, 
      email, 
      mot_de_passe: hashedPassword,
      langue_maternelle, 
      niveau_langue,
      role
    });

    // Générer un token
    const token = jwt.sign({ userId: utilisateur.id_utilisateur }, process.env.JWT_SECRET, { expiresIn: '3h' });
    
    res.status(201).json({ token });
  } catch (err) {
    console.error('Erreur lors de l\'inscription :', err);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trouver l'utilisateur
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    
    // Vérifier l'utilisateur et le mot de passe
    if (!utilisateur || !(await bcrypt.compare(password, utilisateur.mot_de_passe))) {
      return res.status(401).json({ message: 'Identifiant invalide' });
    }

    // Générer un token
    const token = jwt.sign({ userId: utilisateur.id_utilisateur }, process.env.JWT_SECRET, { expiresIn: '3h' });
    
    // Renvoyer le token ET les informations de l'utilisateur (sans le mot de passe)
    res.json({
      token,
      user: {
        id: utilisateur.id_utilisateur,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (err) {
    console.error('Erreur de connexion :', err);
    res.status(400).json({ message: err.message });
  }
};