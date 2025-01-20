import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient()


export const getAllCourses = async(req,res)=>{
    try{
        const courses= await prisma.cours.findMany()
        res.status(200).json(courses)
    }catch(error){
        console.error('Erreur  :', error);
        res.status(400).json({ message: error.message });
    }
}

export const choixCours = async (req,res)=>{
    
}

