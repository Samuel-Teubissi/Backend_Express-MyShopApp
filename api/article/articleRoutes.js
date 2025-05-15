import express from 'express'
import { isAuthenticated } from '../middlewares/validateAuth.js'
import { checkArticleData, validateArticlePost } from '../middlewares/ValidateQuery.js'
import { API_Trader_Article_delete, API_Trader_Article_get, API_Trader_Article_post, API_Trader_Article_put } from './articleController.js'
import uploadFile from '../middlewares/uploadFile.js'

const router = express.Router()

function handleUpload(req, res, next) {
    uploadFile.single('userfile')(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                // Ajout d’un message personnalisé
                res.locals.fileError = { message: 'Le fichier est trop volumineux (max : 2 Mo).' };
                return next(); // On continue pour que le controller gère la réponse
            }
            res.locals.fileError = { message: err.message }
        }
        next()
    })
}

router.get('/:articleID', isAuthenticated, API_Trader_Article_get)
router.delete('/:articleID', isAuthenticated, API_Trader_Article_delete)
router.post('/add', isAuthenticated, handleUpload, checkArticleData, validateArticlePost, API_Trader_Article_post)
router.put('/:articleID', isAuthenticated, handleUpload, checkArticleData, validateArticlePost, API_Trader_Article_put)

export default router;