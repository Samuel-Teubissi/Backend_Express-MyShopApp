import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET'

// Token d'accès
export function generateAccessToken(user) {
    return jwt.sign(
        {
            data_trader: user.data_trader,
            user_id: user.user_id,
            user_name: user.user_name,
            user_number: user.user_number,
            role: user.role
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "45m" }
    );
}

// Token de Refresh
export function generateRefreshToken(user) {
    return jwt.sign(
        { user_id: user.user_id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    )
}

// Vérif de Token
export function verifAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

// Vérifier un refresh token
export function verifRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
}
