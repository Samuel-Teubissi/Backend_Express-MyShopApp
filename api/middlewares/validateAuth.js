import { body, validationResult } from "express-validator";
import { verifAccessToken } from "./token.js";

export const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    const token = authHeader.split(" ")[1]
    try {
        const payload = verifAccessToken(token)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide ou expiré' });
    }

    // console.log('SESSION ACTUELLE :', req.session.user);
    // if (req.session && req.session?.user) {
    //     return next(); // l'utilisateur est authentifié
    // }
    // return res.status(401).json({ error: 'Non authentifié' });
}

export const validateLogin = [
    body('number')
        .notEmpty().withMessage('Champ requis').bail()
        .isInt().withMessage('Saisissez un numéro valide').bail()
        .custom(value => value.toString().length >= 3).withMessage('Saisissez un numéro valide'),
    body('password')
        .notEmpty().withMessage('Champ requis'),
    (req, res, next) => {
        const errorsLogin = validationResult(req)
        if (!errorsLogin.isEmpty()) {
            const objErrors = errorsLogin.array().reduce((obj, error) => {
                obj[error.path] = error.msg;
                return obj;
            }, {})
            return res.status(200).json({
                errors: objErrors
            })
        }
        next()
    }
]

export const validateRegister = [
    body('number')
        .trim().escape().notEmpty().withMessage('Champ requis').bail()
        .isInt().withMessage('Saisissez un numéro valide').bail()
        .custom(value => value.toString().length >= 9).withMessage('Saisissez un numéro valide'),
    body('username')
        .trim().escape().notEmpty().withMessage('Champ requis').bail()
        .isLength({ min: 3 }).withMessage('Minimum 3 caractères'),
    body('password')
        .trim().escape().notEmpty().withMessage('Champ requis'),
    body('confirm_password')
        .trim().escape().notEmpty().withMessage('Champ requis'),
    (req, res, next) => {
        const errorsRegister = validationResult(req)
        if (!errorsRegister.isEmpty()) {
            const objErrors = errorsRegister.array().reduce((obj, error) => {
                obj[error.path] = error.msg
                return obj;
            }, {})
            return res.status(200).json({
                errors: objErrors
            })
        }
        if (req.body.password !== req.body.confirm_password) return res.status(200).json({
            errors: { confirm_password: "Les mots de passes ne correspondent pas" }
        })
        next()
    }
]