import { Router } from "express";
import { fetchDiscussion } from "../controllers/Etudiants/ChatController.js";

const router = Router()

router.post('/discussions',fetchDiscussion)

export default router