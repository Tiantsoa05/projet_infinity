import { Router } from "express";
import { getAllProfs } from "../controllers/ProfController.js";

const router = Router();

router.get("/all",getAllProfs)

export default router;