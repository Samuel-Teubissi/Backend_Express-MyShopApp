import express from 'express'
import { API_dataListUsers, API_dataDashboard, API_dataArticles } from './adminController.js'

const router = express.Router()

router.get('/all_users', API_dataListUsers)
router.get('/dashboard', API_dataDashboard)
router.get('/articles', API_dataArticles)

export default router;