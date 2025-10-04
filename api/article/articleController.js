import dayjs from "dayjs";
import * as articleModel from "./articleModel.js";
import { generateAccessToken } from "../middlewares/token.js";

const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

const API_BTrader = async (req, res) => {
    const { user_id, data_trader, user_name, user_number } = req.user
    if (data_trader) return res.status(200).json({ status: false, message: '', errors: 'Vous êtes déjà trader !' })
    const dataTrader = { id_trader: data_trader, number: user_number, name: user_name, trader_date: formattedDate }
    const Btrader = await articleModel.BecomeTrader(dataTrader)
    const newPayload = { data_trader: Btrader, user_id, user_name, user_number, role: 'user' }
    const newAccessToken = generateAccessToken(newPayload)

    res.status(200).json({ status: true, message: "Vous êtes désormais un Trader !", token: newAccessToken })
}

const API_Trader_Article_get = async (req, res) => {
    const { data_trader } = req.user || {}
    const { articleID } = req.params
    let articleData = await articleModel.getArticle(articleID, data_trader)
    res.status(200).json(articleData)
}

const API_Trader_Article_delete = async (req, res) => {
    const { data_trader } = req.user
    const { articleID } = req.params
    await articleModel.deleteArticle(articleID, data_trader)
    res.status(200).json({
        status: 'success',
        message: "Article supprimé"
    })
}

const API_Trader_Article_put = async (req, res) => {
    const { articleID } = req.params;
    const { article, price, quantity, category } = req.body;
    const file_name = req.file?.filename || null

    try {
        const data = { date_updated: formattedDate }
        if (article) data.article = article
        if (price) data.price = price
        if (quantity) data.quantity = quantity
        if (category) data.category = category
        if (file_name) data.file_name = file_name

        const updatedArticle = await articleModel.updateArticle(articleID, data)
        if (updatedArticle === 0) {
            return res.status(200).json({
                status: "error",
                message: "Aucune donnée à mettre à jour"
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Produit mis à jour !"
        })
    } catch (error) {
        return res.status(500).json({ controller: 'article', error: error.message })
    }
}

const API_Trader_Article_post = async (req, res) => {
    const { data_trader } = req.user;
    const { article, price, quantity, category } = req.body;
    const file_name = req.file?.filename || null

    try {
        if (article && price && quantity && category && file_name) {
            const verifArticle = await articleModel.checkArticle(article)
            if (verifArticle.length === 0) {
                const data = {
                    id_trader: data_trader,
                    price: price,
                    article: article,
                    quantity: quantity,
                    category: category,
                    file_name: file_name,
                    art_visible: 1,
                    date: formattedDate
                }
                await articleModel.saveArticle(data)
                return res.status(200).json({
                    status: "success",
                    message: "L'article a été ajouté avec succès"
                })
            } else {
                return res.status(200).json({ errors: { article: "Ce nom d'article est déjà utilisé" } })
            }
        }
    } catch (error) {
        return res.status(500).json({ controller: 'article', error: error.message })
    }
}

export { API_Trader_Article_delete, API_Trader_Article_get, API_Trader_Article_put, API_Trader_Article_post, API_BTrader }