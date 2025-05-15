// import db from '../../dbConfig/db.js'
import { checkTrader, checkUser, createUser, userExist } from "./authModel.js"

const API_Register = async (req, res) => {
    const { username, number } = req.body
    if (await userExist(number)) return res.status(200).json({ errors: { number: "Ce numéro déjà un compte" } })
    const idUser = await createUser(req.body)
    if (!idUser) return res.status(200).json({ message: "Echec de l'enregistrement" })
    req.session.user = {
        data_trader: '',
        user_id: idUser,
        user_name: username,
        user_number: number,
        role: 'user'
    }
    res.status(200).json({
        status: 'success',
        message: "Inscription Réussie",
        user_token: req.session.user
    })
}

const API_Login = async (req, res) => {
    const { number, password } = req.body
    const verifUser = await checkUser(number, password)
    if (verifUser.errors) return res.status(200).json({ errors: verifUser.errors })
    const dataTrader = await checkTrader(number)
    req.session.user = {
        data_trader: dataTrader?.id_trader || '',
        user_id: verifUser.id_user,
        user_name: verifUser.name,
        user_number: verifUser.number,
        role: 'user'
    }
    res.status(200).json({
        status: 'success',
        message: "Connexion Réussie",
        user_token: req.session.user
    })
}

const API_logged = (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            status: 'success',
            message: "Utilisateur connecté",
            dataUser: req.session.user
        })
    }
}

const API_logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ controller: 'auth', error: "Erreur lors de la déconnexion" })
        res.status(200).json({
            status: true,
            message: "Déconnexion",
        })
    })
}

export { API_Login, API_logged, API_logout, API_Register }