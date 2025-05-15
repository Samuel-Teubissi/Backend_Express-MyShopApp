// db.js
import knex from 'knex';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

dotenv.config()
// Pour __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const dbPath = process.env.DB_PATH + 'database.sqlite'
const dbPath = path.join(process.cwd(), 'dbConfig', 'database.sqlite')

// Configuration de Knex avec SQLite
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
});

// Lecture et exécution de init.sql au démarrage
const initDatabase = async () => {
    if (!fs.existsSync(dbPath)) {
        console.log('Base introuvable. Création en cours...');
        const initPath = path.join(__dirname, 'dbSchema.sql');
        const sql = await fsPromises.readFile(initPath, 'utf8');
        // Séparer les requêtes (si plusieurs dans le fichier)
        const queries = sql
            .split(';')
            .map((q) => q.trim())
            .filter((q) => q.length);
        for (const query of queries) {
            try {
                await db.raw(query);
            } catch (err) {
                console.error('Erreur dans init.sql :', err.message);
            }
        }
        console.log('Base de données initialisée.');
    } else {
        console.log('Base de données déjà existante, pas de réinitialisation.');
    }
};

await initDatabase();

export default db;
