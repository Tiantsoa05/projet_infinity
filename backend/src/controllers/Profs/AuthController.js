import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

export const registerProf = async (req,res)=>{
  const { nom, prenom, email, password, diplome, niveau_etude, id_langue } = req.body
  try{
    const existingProf = await prisma.professeur.findFirst({where:{mail_prof: email}})
    const existingUser = await prisma.etudiant.findFirst({where:{e_mail: email}})
    
    if(existingProf || existingUser){
      return res.status(400).json({errorMessage: "Compte déjà existant avec ce mail"})
    }

    // Crypt the password
    const passHashed = await bcrypt.hash(password,12)

    const prof = await prisma.professeur.create(
      {
        data:{
        nom_prof: nom,
        prenom_prof: prenom,
        mail_prof: email,
        mdp_prof: passHashed,
        Diplome: diplome,
        Niveau_Etude: niveau_etude,
        id_langue: parseInt(id_langue)
      }
    })

    const token = jwt.sign(
      {
        userId: prof.id_prof
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"3h"
      }
    )
    
    res.status(200).json({token})
  }catch(error){
    console.error('Erreur lors de l\'inscription :', error);
    res.status(400).json({ message: error.message });
  }
}

export const loginProf = async (req, res) => {
  const { mail, password } = req.body;

  try{

    const prof = await prisma.professeur.findFirst({
      where: {
        mail_prof: mail,
      }
    });
  
    if (!prof || !(await bcrypt.compare(password,prof.mdp_prof))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  
    const token = jwt.sign({ userId: prof.id_etudiant , nom: prof.nom_prof}, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
  
    res.json({ 
      token,
      user:{
        id: prof.id_prof,
        nom: prof.nom_prof,
        prenom: prof.prenom_prof,
        email: prof.mail_prof,
        role: "ENSEIGNANT"
      }
    });

  }catch(error){
    console.error('Erreur de connexion :', error);
    res.status(400).json({ message: error.message });
  }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Déconnexion réussie" });
}