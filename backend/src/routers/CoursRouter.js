import {Router} from 'express'
import { 
    createCourse, 
    getProfCoursesNumber 
} from '../controllers/CoursController.js'

const router = Router()

router.get('/number/:id_prof',getProfCoursesNumber)
router.post('/new',createCourse)

export default router