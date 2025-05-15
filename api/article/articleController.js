import dayjs from "dayjs";
import * as articleModel from "./articleModel.js";

const API_Trader_Article_get = async (req, res) => {
    const { data_trader } = req.session.user || {}
    const { articleID } = req.params
    let articleData = await articleModel.getArticle(articleID)
    res.status(200).json(articleData)
}

const API_Trader_Article_delete = async (req, res) => {
    const { data_trader } = req.session.user
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
        const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
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
        res.status(200).json({
            status: "success",
            message: "Produit mis à jour !"
        })
    } catch (error) {
        return res.status(500).json({ controller: 'article', error: error.message })
    }
}

const API_Trader_Article_post = async (req, res) => {
    const { data_trader } = req.session.user;
    const { article, price, quantity, category } = req.body;
    const file_name = req.file?.filename || null

    try {
        if (article && price && quantity && category && file_name) {
            const verifArticle = await articleModel.checkArticle(article)
            if (verifArticle.length === 0) {
                const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
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
                res.status(200).json({
                    status: "success",
                    message: "L'article a été ajouté avec succès"
                })
            } else {
                res.status(200).json({ errors: { article: "Ce nom d'article est déjà utilisé" } })
            }
        }
    } catch (error) {
        return res.status(500).json({ controller: 'article', error: error.message })
    }
}

export { API_Trader_Article_delete, API_Trader_Article_get, API_Trader_Article_put, API_Trader_Article_post }