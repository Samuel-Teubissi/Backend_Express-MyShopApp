import db from '../../dbConfig/db.js'

const BecomeTrader = async (data) => {
    const verifTrader = db('trader').select('*').where({ id_trader: data.id_trader }).first()
    if (verifTrader.lentgh === 0) {
        const [idTrader] = db('trader').insert(data)
        return idTrader
    }
    return null
}

const getArticle = async (articleID, TraderId) => {
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

export { getArticle, deleteArticle, updateArticle, checkArticle, saveArticle, BecomeTrader }