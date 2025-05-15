import db from '../../dbConfig/db.js'

const getArticle = async (articleID, TraderId = "25") => {
    return db('articles').select('*').where({ id_articles: articleID, id_trader: TraderId }).first()
}

const checkArticle = async (articleName) => {
    return db('articles').select('*').where({ article: articleName })
}

const deleteArticle = async (articleID, TraderId) => {
    return await db('articles').where({ id_articles: articleID, id_trader: TraderId }).update({ art_visible: 0 })
}

const updateArticle = async (articleID, data) => {
    return await db('articles').where({ id_articles: articleID }).update(data)
}

const saveArticle = async (data) => {
    return await db('articles').insert(data)
}

export { getArticle, deleteArticle, updateArticle, checkArticle, saveArticle }