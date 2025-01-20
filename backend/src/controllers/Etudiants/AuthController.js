import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

export const register = async (req,res)=>{
  const { nom, prenom, email, password, datenaiss } = req.body
  console.log(req.body)
  try{
    const existingUser = await prisma.etudiant.findFirst({where:{e_mail: email}})
    const existingProf = await prisma.professeur.findFirst({where:{mail_prof: email}})
    
    if(existingProf || existingUser){
      return res.status(400).json({errorMessage: "Compte déjà existant avec le mail"})
    }

  
    // Crypt the password
    const passHashed = await bcrypt.hash(password, 10)

    
    const etudiant = await prisma.etudiant.create(
      {data:{
        nom_etudiant: nom,
        prenom_etudiant: prenom,
        e_mail: email,
        mdp: passHashed,
        Date_Naissance: datenaiss,
        id_prof: null,
        id_niveau: null
      }}
    )

    const token = jwt.sign(
      {
        userId: etudiant.id_etudiant
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

export const login = async (req, res) => {
  const { mail, password } = req.body;

  try{

    const etudiant = await prisma.etudiant.findFirst({
      where: {
        e_mail: mail,
      }
    });
  
    if (!etudiant || !(await bcrypt.compare(password,etudiant.mdp))) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  
    const token = jwt.sign({ userId: etudiant.id_etudiant , nom:etudiant.nom_etudiant}, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
  
    res.json({ 
      token,
      user:{
        id: etudiant.id_etudiant,
        nom: etudiant.nom_etudiant,
        prenom: etudiant.prenom_etudiant,
        email: etudiant.e_mail,
        role: "ETUDIANT",
        prof:etudiant.id_prof
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