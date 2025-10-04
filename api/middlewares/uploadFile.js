import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const UploadPATH = path.resolve(process.cwd(), 'assets/img/articles/')
        cb(null, UploadPATH)
    },
    // destination: path.resolve(process.cwd(), 'assets/img/articles/'),
    filename: (req, file, cb) => {
        const fileName = 'article_' + req.user.data_trader + '-' + Date.now() //file.originalname
        cb(null, fileName)
    }
})

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else cb(new Error('Type de fichier non autorisé'))
    }
})

export default uploadFile