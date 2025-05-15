import express from 'express'
import { API_CreateNotif, API_getNotif, API_readNotif } from './notifsController.js';
import upload from '../middlewares/fromParser.js';
// import { validateNotifPost } from '../middlewares/ValidateQuery.js';

const router = express.Router()

router.get('/fetch/:user', API_getNotif)
router.get('/read/:notifID', API_readNotif)
router.post('/create', upload.none(), API_CreateNotif)

export default router;