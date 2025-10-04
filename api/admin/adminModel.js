import db from '../../dbConfig/db.js'

export const API_ListUsers = async () => {
    return db('user')
        .select('user.*', 'trader.number as trader_number', 'trader.name as trader_name')
        // .join('category', 'articles.category', 'category.id_categ')
        .leftJoin('trader', 'user.number', 'trader.number')
        .orderBy('id_user', 'desc')
        .limit(6);
}
export const API_ListArticles = async () => {
    return db('articles')
        .select('*')
        .join('category', 'articles.category', 'category.id_categ')
        .join('trader', 'articles.id_trader', 'trader.id_trader')
        .orderBy('id_articles', 'desc')
        .limit(6);
}
export const API_TurnOver = async () => {
    const result = await db('db_command_cart')
        .sum('total as total')
        .first();
    return result.total;
}
export const API_Users = async () => {
    return db('user').select('*');
}
export const API_Selling = async () => {
    return db('db_command_cart').select('*');
}