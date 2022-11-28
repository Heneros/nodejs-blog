import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Wrong format email').isEmail(),
    body('password', 'Password must min 5 symbols').isLength({ min: 5 }),
];
export const registerValidation = [
    body('email', 'Wrong format email').isEmail(),
    body('password', 'Password must min 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Enter your name').isLength({ min: 3 }),
    body('avatarUrl', 'Wrong link to avatar').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter title post').isLength({ min: 3 }).isString(),
    body('text', 'Enter text post').isLength({ min: 3 }).isString(),
    body('tags', 'Wrong format tags').optional().isString(),
    body('imageUrl', 'Wrong link on image').optional().isString(),
]