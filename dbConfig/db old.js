import sqlite3 from 'sqlite3'
import path from 'path'
import { open } from "sqlite"
import { readFile } from 'fs/promises'
import { fileURLToPath } from "url"

let db;
// Ces deux lignes remplacent __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export const initDB = async () => {
//     const db = await open({
//         filename: path.join(__dirname, 'database.sqlite'),
//         driver: sqlite3.Database,
//     });
//     // Charger le fichier SQL à l'initialisation si nécessaire
//     const sql = await readFile(path.join(__dirname, 'dbSchema.sql'), 'utf8');
//     await db.exec(sql);
//     return db;
// };
