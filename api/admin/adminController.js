import { API_ListArticles, API_ListUsers, API_Selling, API_TurnOver, API_Users } from "./adminModel.js";

const API_dataListUsers = async (req, res) => {
    const users = await API_ListUsers();
    return res.status(200).json({
        statut: 'success',
        usersData: users,
        usersTotal: users.length
    })
}

const API_dataDashboard = async (req, res) => {
    const total_users = await API_Users()
    const total_sales = await API_Selling()
    const turnover = await API_TurnOver()
    return res.status(200).json({
        statut: 'success',
        total_users: total_users.length,
        total_sales: total_sales.length,
        turnover: turnover
    })
}

const API_dataArticles = async (req, res) => {
    const articles = await API_ListArticles();
    return res.status(200).json({
        statut: 'success',
        articlesData: articles
    })
}

export { API_dataListUsers, API_dataDashboard, API_dataArticles }