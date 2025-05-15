// import { initDB } from '../../dbConfig/db.js'
import db from '../../dbConfig/db.js'

const API_get_Articles = async (TraderId, limit = null) => {
    let query = db('articles')
        .select('articles.*', 'trader.*', 'category.*')
        .join('category', 'articles.category', 'category.id_categ')
        .join('trader', 'articles.id_trader', 'trader.id_trader')
        .whereNot('art_visible', 0)
        .orderBy('id_articles', 'desc');
    if (TraderId) {
        query = query.whereNot('articles.id_trader', TraderId);
    }
    if (limit) {
        query = query.limit(limit.per_page).offset(limit.offset);
    }
    return query
}

const API_get_StockArticles = (TraderId, limit = null) => {
    let query = db('articles')
        .select('articles.*', 'trader.*', 'category.*')
        .join('category', 'articles.category', 'category.id_categ')
        .join('trader', 'articles.id_trader', 'trader.id_trader')
        .where('articles.id_trader', TraderId)
        .whereNot('art_visible', 0)
        .orderBy('id_articles', 'desc');
    if (limit) {
        query = query.limit(limit.per_page).offset(limit.offset);
    }
    return query
}

const API_get_Categories = async () => {
    let query = db('category').select('*').orderBy('content', 'desc')
    const categDB = await query
    const Categories = {
        0: "Catégorie"
    };
    function capitalizeFirstLetter(str) {
        if (!str) return '';
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
    categDB.forEach((value) => {
        Categories[value.id_categ] = capitalizeFirstLetter(value.content)
        // .toLowerCase()
        // .replace(/\b\w/g, (char) => char.toUpperCase());
    });
    return Categories
}

const API_get_Search = async (search_article, search_categ, limit = null, controller = 'home', TraderId = '') => {
    let query = db('articles')
        .select('articles.*', 'trader.*', 'category.*')
        .join('category', 'articles.category', 'category.id_categ')
        .join('trader', 'articles.id_trader', 'trader.id_trader')
        .whereNot('art_visible', 0)
        .orderBy('id_articles', 'desc');
    if (controller === 'home') query = query.whereNot('articles.id_trader', TraderId)
    if (controller === 'trader') query = query.where('articles.id_trader', TraderId)
    if (search_article) query = query.whereRaw('LOWER(articles.article) LIKE ?', [`%${search_article.toLowerCase()}%`])
    if (search_categ) query = query.whereRaw('LOWER(articles.category) LIKE ?', [`%${search_categ.toLowerCase()}%`])
    if (limit) {
        query = query.limit(limit.per_page).offset(limit.offset);
    }
    return query
}

export { API_get_Articles, API_get_StockArticles, API_get_Categories, API_get_Search }