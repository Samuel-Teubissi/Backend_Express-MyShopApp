// import { API_get_Articles, API_get_Categories, API_get_Search, API_get_StockArticles } from "./articlesModel.js";
import * as articlesModel from "./articlesModel.js";


const API_Home_Articles = async (req, res) => {
    const { offset, per_page } = req.pagination
    // Simule session comme dans CI3
    const { data_trader } = req.session.user || {};
    // Récupérer les articles paginés 
    try {
        const articles = await articlesModel.API_get_Articles(data_trader, { offset, per_page })
        const total_articles = (await articlesModel.API_get_Articles()).length
        const total_pages = Math.ceil(total_articles / per_page);
        res.status(200).json({
            status: 'success',
            articlesData: articles,
            total_pages: total_pages,
            total_articles: total_articles
        })
    } catch (error) {
        res.status(500).json({ controller: 'articles', error: error.message })
    }
}

const API_Trader_Articles = async (req, res) => {
    const { offset, per_page } = req.pagination
    const { data_trader } = req.session.user || {};
    try {
        const articles = await articlesModel.API_get_StockArticles(data_trader, { offset, per_page })
        const total_articles = (await articlesModel.API_get_StockArticles(data_trader)).length
        const total_pages = Math.ceil(total_articles / per_page);
        res.status(200).json({
            status: 'success',
            articlesData: articles,
            total_pages: total_pages,
            total_articles: total_articles
        })
    } catch (error) {
        res.status(500).json({ controller: 'articles', error: error.message })
    }
}

const API_count_Articles = async (req, res) => {
    const { per_page } = req.pagination
    const { data_trader } = req.session.user || {};
    const { controller } = req.params
    if (controller === 'trader') {
        const total_articles = (await articlesModel.API_get_StockArticles(data_trader)).length
        const total_pages = Math.ceil(total_articles / per_page);
        return res.status(200).json({
            status: true,
            latest_total_pages: total_pages,
            latest_total_articles: total_articles
        })
    }
    const total_articles = (await articlesModel.API_get_Articles()).length
    const total_pages = Math.ceil(total_articles / per_page);
    res.status(200).json({
        status: true,
        latest_total_pages: total_pages,
        latest_total_articles: total_articles
    })
}

const API_categories = async (req, res) => {
    res.status(200).json({
        status: true,
        data: await articlesModel.API_get_Categories()
    })
}

const API_Search = async (req, res) => {
    const { offset, per_page } = req.pagination
    const { search, categ, controller } = req.searchQ
    const { data_trader } = req.session.user || {};
    try {
        const articles = await articlesModel.API_get_Search(search, categ, { offset, per_page }, controller, data_trader)
        const total_articles = (await articlesModel.API_get_Search(search, categ, null, controller, data_trader)).length
        const total_pages = Math.ceil(total_articles / per_page);
        res.status(200).json({
            status: 'success',
            articlesData: articles,
            total_pages: total_pages,
            total_articles: total_articles
        })
    } catch (error) {
        res.status(500).json({ controller: 'articles', error: error.message })
    }
}

export { API_Home_Articles, API_Trader_Articles, API_count_Articles, API_categories, API_Search }