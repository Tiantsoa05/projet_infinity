const {Message} = require('../models/model')
const {validationError, DatabaseError}= require('sequelize')

class MessageController {
    async listMessages(req,res){
        try{
            const {id_prof,id_etudiant} = req.body
            const messages = await Message.findAll(
                {
                    where:{
                        id_etudiant,
                        id_prof
                    }
                }
            )
            return res.status(200).json(messages)
        }catch(error){
            return res.status(500).json({
                succes: false,
                message: 'Erreur lors de la récupération des messages',
                error: error.message
            });
        }
    }

    async saveMessage(req,res){
        try{
            const {id_prof,id_etudiant,contenu,send_type} = req.body
            const newMessage = await Message.create(
                {
                    id_etudiant,
                    id_prof,
                    contenu,
                    send_type
                }
            )
            return res.status(201).json({
                success: true,
                message: 'Cours crée avec succès',
                data: nouveauCours
            });
        }catch(error){
            if(error instanceof validationError) {
                return res.status(400).json ({
                    success: false,
                    message: 'Erreur de validation',
                    errors:  error.error.map(e => e.message)
                });
            }

        return res.status(500).json({
            success: false,
            message:'Erreur',
            error: error.message
        })
        }
    }
}

module.exports = new MessageController()