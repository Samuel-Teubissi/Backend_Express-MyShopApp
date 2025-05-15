import express from 'express'
import { API_categories, API_count_Articles, API_Home_Articles, API_Search, API_Trader_Articles } from './articlesController.js'
import { ValidatePage, validateSearchQuery } from '../middlewares/ValidateQuery.js'
import { isAuthenticated } from '../middlewares/validateAuth.js';

const router = express.Router();

router.get('/home', ValidatePage, API_Home_Articles);
router.get('/trader', isAuthenticated, ValidatePage, API_Trader_Articles);
router.get('/total/:controller', ValidatePage, API_count_Articles);
router.get('/categories', API_categories);
router.get('/search', validateSearchQuery, ValidatePage, API_Search);

export default router;