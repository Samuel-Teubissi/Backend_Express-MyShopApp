import multer from 'multer';

const storage = multer.memoryStorage(); // ou diskStorage si tu veux
const upload = multer({ storage });

export default upload; // aucun fichier attendu, juste des champs texte
