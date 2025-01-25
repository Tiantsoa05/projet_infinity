import { PrismaClient } from "@prisma/client";
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()


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

export const getProfCoursesNumber = async (req,res)=>{
    const {id_prof} = req.params

    const coursesNumber = await prisma.cours.count({
        where:{
            id_professeur: parseInt(id_prof)
        }
    })

    res.status(200).json({numberCourses:coursesNumber})
}

export const createCourse = async (req,res)=>{

    const {titre,id_langue,id_prof} = req.body
    console.log(req, req.body)
    const fichier = req.file

    if (!fichier) {
        return res.status(400).send({ errorMessage: "Aucun fichier uploadé." });
    }

    try {

        const owner = await prisma.professeur.findFirst({
            where:{
                id_prof: parseInt(id_prof)
            }
        })

        const fileSize = fichier.size; 
        const ext = path.extname(fichier);
        const fileName = [fichier.filename,ext].join('');
        const allowedTypes = ['.pdf', '.mp4','.mp3', '.jpeg', '.jpg', '.jpeg'];

        const TypeFilePath = null

        switch (ext){
            case allowedTypes[0]:
                TypeFilePath = "pdf"
                break
                
            case allowedTypes[1]:
                TypeFilePath = "video"
                break 
            
            case allowedTypes[2]:
                TypeFilePath = "audio"
                break
            
            default:
                TypeFilePath='image'
        }

        const fichierPath = path.resolve(
            path.dirname('uploads'),
            `${owner.nom_prof.toLocaleLowerCase()}_${owner.prenom_prof.toLocaleLowerCase()}`,
            TypeFilePath,
            fileName
        );
        // const url = `${req.protocol}://${req.get("host")}/assets/fournisseur/${fileName}`;

        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(400).json({ messageError: "Fichier invalide" });
        }
        if (fileSize > 50000000) {
            return res.status(400).json({ messageError: "Image devrait être moins de 50 MB" });
        }

        const dir = path.dirname(fichierPath);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        fs.rename(fichier.path, imagePath, async (err) => {
            if (err) return res.status(500).json({ messageError: err.message });

            try {
                await prisma.cours.create({
                    data: {
                        contenu_cours: fichierPath,
                        titre,
                        id_langue: parseInt(id_langue),
                        id_professeur: parseInt(id_prof)
                    }
                });
                res.status(200).send({ messageSuccess: "Cours ajouté avec succès" });
            } catch (error) {
                fs.unlink(fichier.path).catch(console.error)
                res.status(500).send({ messageError: "Erreur de connexion" });
                console.error(error);
            }
        });

    } catch (error) {
        res.status(500).send({ errorMessage: "Internal server error" });
        console.error(error);
    }
}