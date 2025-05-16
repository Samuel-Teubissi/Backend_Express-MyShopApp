// import db from '../../dbConfig/db.js'
import jwt from "jsonwebtoken"
import { checkTrader, checkUser, createUser, findUser, userExist } from "./authModel.js"
import { generateAccessToken, generateRefreshToken, verifRefreshToken } from "../middlewares/token.js"

const API_Register = async (req, res) => {
    const { username, number } = req.body
    if (await userExist(number)) return res.status(200).json({ errors: { number: "Ce numéro déjà un compte" } })
    const idUser = await createUser(req.body)
    if (!idUser) return res.status(200).json({ message: "Echec de l'enregistrement" })
    const user = {
        data_trader: null,
        user_id: idUser,
        user_name: username,
        user_number: number,
        role: 'user'
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 1 * 24 * 60 * 60 * 1000 //1 jour
    })
    res.status(200).json({
        status: 'success',
        message: "Connexion Réussie",
        // user_session: user,
        user_token: accessToken
    })
    // req.session.user = {
    //     data_trader: '',
    //     user_id: idUser,
    //     user_name: username,
    //     user_number: number,
    //     role: 'user'
    // }
    // res.status(200).json({
    //     status: 'success',
    //     message: "Inscription Réussie",
    //     user_token: req.session.user
    // })
}

const API_Login = async (req, res) => {
    const { number, password } = req.body
    const verifUser = await checkUser(number, password)
    if (verifUser.errors) return res.status(200).json({ errors: verifUser.errors })
    const dataTrader = await checkTrader(number)
    const user = {
        data_trader: dataTrader?.id_trader || null,
        user_id: verifUser.id_user,
        user_name: verifUser.name,
        user_number: verifUser.number,
        role: 'user'
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 1 * 24 * 60 * 60 * 1000 //1 jour
    })
    res.status(200).json({
        status: 'success',
        message: "Connexion Réussie",
        // user_session: user,
        user_token: accessToken
    })
}

const API_logged = async (req, res) => {
    // console.log('API_logged', req.session.user)
    // if (req.session.user) {
    //     res.status(200).json({
    //         status: 'success',
    //         message: "Utilisateur connecté",
    //         dataUser: req.session.user
    //     })
    // }
}

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(401).json({ error: 'Refresh token manquant' });
    const payload = verifRefreshToken(token)
    if (!payload) return res.status(401).json({ error: 'Refresh token invalide' });
    try {
        const user = await findUser(payload.user_id)
        if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
        const newAccessToken = generateAccessToken(user)

        return res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        return res.status(403)
    }
}

const API_logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ controller: 'auth', error: "Erreur lors de la déconnexion" })
        res.clearCookie('connect.sid');
        res.status(200).json({
            status: true,
            message: "Déconnecté avec succès",
        })
    })
}

export { API_Login, API_logged, API_logout, API_Register, refreshToken }