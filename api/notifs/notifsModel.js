import db from '../../dbConfig/db.js'

const API_get_notifications = (user) => {
    let query = db('db_notifications').select('*').where('notif_user', user).orderBy('notif_id', 'desc')
    return query
}

const apiNotif_count_unread = (user) => {
    let query = db('db_notifications').select('*').where('notif_user', user).where('notif_status', 'unread')
    return query
}

const apiNotif_mark_as_read = async (notifId) => {
    return await db('db_notifications').where('notif_id', notifId).update({ notif_status: 'read' })
}

const apiSaveNotification = async (dataNotifs) => {
    return await db('db_notifications').insert(dataNotifs)
}

export { API_get_notifications, apiNotif_count_unread, apiNotif_mark_as_read, apiSaveNotification }