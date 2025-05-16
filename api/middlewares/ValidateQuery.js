import express from 'express';
import { body, query, validationResult } from 'express-validator';

const arrayCategories = { min: 1, max: 7 } // Catégories disponibles sur le site

// Middleware
export const ValidatePage = (req, res, next) => {
    const rawPage = req.query.page;
    const parsed = parseInt(rawPage, 10);
    if (!parsed || parsed < 1) {
        req.page = 1;
    } else {
        req.page = parsed;
    }

    const pagination_limit = 3
    const pagination_search = 2
    const per_page = pagination_limit
    const currentPage = Math.max(1, req.page);
    req.pagination = {
        per_page: per_page,
        offset: (currentPage - 1) * per_page
    }

    next();
}

export const validateSearchQuery = [
    query('search_article')
        .trim().escape().optional(),
    query('search_categ')
        .trim().escape().optional(),
    query('controller')
        .trim().escape(),
    // .notEmpty().withMessage('Pas de controller'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(200).json({ errors: errors.array() })
        const { search_article, search_categ, controller } = req.query
        // if (!search_article && !search_categ) return res.status(200).json({ success: 'error', message: 'Pas de valeur pour la recherche', query: req.query })

        req.searchQ = {
            search: search_article,
            categ: Number(search_categ) > 0 ? search_categ : '',
            controller: controller === 'trader' ? controller : 'home'
        }
        next()
    }
]

export const checkArticleData = [
    body(['article', 'price', 'quantity', 'category'])
        .trim().escape().notEmpty().withMessage('Champ requis').bail(),
    body('article')
        .isLength({ min: 3 }).withMessage('3 caractères minimum').bail()
        .matches(/^[\p{L}\p{N} ]+$/u).withMessage("Le nom n'a pas un format valide"),
    body('price')
        .isInt({ min: 25 }).withMessage('Les prix commencent à partir de 25 F').bail()
        .custom(value => value.toString().length >= 2).withMessage('Saisissez un numéro valide'),
    body('quantity')
        .isInt({ min: 0 }).withMessage('Quantité non valide'),
    body('category')
        .isInt(arrayCategories).withMessage('Catégorie non valide')
]

export const validateArticlePost = (req, res, next) => {
    const errorsLogin = validationResult(req)
    const { fileError } = res.locals
    if (!errorsLogin.isEmpty()) {
        let objErrors = errorsLogin.array().reduce((obj, error) => {
            obj[error.path] = error.msg;
            return obj;
        }, {})
        if (fileError) {
            objErrors = {
                ...objErrors,
                userfile: fileError.message
            }
        }
        return res.status(200).json({
            errors: objErrors
        })
    }
    next()
}