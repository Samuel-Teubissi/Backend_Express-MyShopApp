import dayjs from 'dayjs'
import db from '../../dbConfig/db.js'
import { createHash } from 'crypto'

export const userExist = async (number) => {
    return await db('user').where({ number }).first()
}

export const hashPassword = (password) => {
    return createHash('sha256').update(password).digest('hex')
}

export const checkUser = async (number, password) => {
    const user = await userExist(number)
    if (!user) return { errors: { number: "Numéro saisi incorrect ou sans compte" } }
    const hashedPassword = hashPassword(password)
    if (hashedPassword !== user.password) return { errors: { password: "Mot de passe saisi incorrect" } }
    return user
}

export const checkTrader = async (number) => {
    return await db('trader').where({ number }).first()
}

export const createUser = async ({ number, username, password }) => {
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const [insertedId] = await db('user').insert({ number, password: hashPassword(password), name: username, date: formattedDate })
    return insertedId
}