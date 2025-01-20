import { Router} from "express";
import { getFollowerStudents } from "../controllers/StudentControllers.js";

const router = Router();

router.get('/followers/:id_prof', getFollowerStudents)

export default router