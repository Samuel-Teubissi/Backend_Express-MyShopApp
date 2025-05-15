import bodyParser from 'body-parser';
import express from 'express'
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import articlesRoutes from './api/articles/articlesRoutes.js'
import articleRoutes from './api/article/articleRoutes.js'
import authRoutes from './api/auth/authRoutes.js'
import notifsRoutes from './api/notifs/notifsRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path'
dotenv.config();

const SQLiteStoreSession = SQLiteStore(session); // constructeur

const app = express()
const PORT = process.env.PORT
const allowedOrigins = [process.env.ALLOW_CORS];

// Middleware pour parser les données JSON
// app.use(bodyParser.json());
app.use(cors({
    // origin: (origin, callback) => {
    //     if (!origin || allowedOrigins.includes(origin)) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // }, // ton frontend
    origin: process.env.ALLOW_CORS,
    credentials: true                // permet l'envoi de cookies/session
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'))
const sessionPath = path.join(process.cwd(), 'dbConfig')

app.use(session({
    store: new SQLiteStoreSession({
        db: 'sessions.sqlite', // nom du fichier de session
        dir: './dbConfig',     // dossier où stocker le fichier
        table: 'sessions',     // nom de la table SQLite (optionnel)
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true si HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 jour
        sameSite: 'lax',
    },
}));

// Gestion des Routes de l'application
app.use('/api/articles', articlesRoutes)
app.use('/api/article', articleRoutes)
app.use('/api/notifs', notifsRoutes)
app.use('/api/auth', authRoutes)

app.get("/", (req, res) => {
    res.send("API Backend de l'application MyShop APP")
})
// Exemple d’utilisation
app.get('/session-test', (req, res) => {
    req.session.visits = (req.session.visits || 0) + 1;
    res.json({ message: `Visite n°${req.session.visits}` });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})