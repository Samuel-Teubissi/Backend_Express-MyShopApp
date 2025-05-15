import dayjs from "dayjs";
import * as notifsModel from "./notifsModel.js";

const API_getNotif = async (req, res) => {
    const { user } = req.params
    const dataNotifs = await notifsModel.API_get_notifications(user)
    const countNotifs = await notifsModel.apiNotif_count_unread(user)
    res.status(200).json({
        status: 'success',
        dataNotifs: dataNotifs,
        countNotifs: countNotifs
    })
}

const API_readNotif = async (req, res) => {
    const { notifID } = req.params
    await notifsModel.apiNotif_mark_as_read(notifID)
    res.status(200).json({
        status: 'success',
        message: 'Notif read'
    })
}

const API_CreateNotif = async (req, res) => {
    const { userId, type } = req.body
    let message;
    let role;
    switch (type) {
        case 'addCommand':
            message = 'Vous avez validé une nouvelle commande';
            role = 'user';
            break;
        case 'addUser':
            message = 'Un nouvel utilisateur inscrit sur la plateforme';
            role = 'admin';
            break;
        case 'addArticle':
            message = 'Vous avez ajouté un nouveau produit sur la plateforme';
            role = 'user';
            break;
        case 'updateArticle':
            message = 'Vous avez mis à jour un produit';
            role = 'user';
            break;
        case 'deleteArticle':
            message = 'Vous avez supprimé un produit du site';
            role = 'user';
            break;
        default:
            message = '';
            role = '';
    }
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const data = {
        notif_message: message,
        notif_user: userId,
        notif_type: type,
        notif_date: formattedDate
    }
    await notifsModel.apiSaveNotification(data)
    return res.status(200).json({ success: true })
}

export { API_getNotif, API_readNotif, API_CreateNotif }