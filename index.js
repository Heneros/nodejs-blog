import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { DB_PASSWORD } from './keys.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

// import { register, login, getMe } from './controllers/UserController';

//Все методы сохранить в UserController
import { UserController, PostController } from './controllers/index.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';
const app = express();

mongoose
    .connect(`mongodb+srv://admin:${DB_PASSWORD}@cluster0.mr4lmgx.mongodb.net/blog?retryWrites=true&w=majority`)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB error', err))


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//express read json request data
app.use(express.json());
app.use(cors());
//express display in browser static files from folder uploads
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Hello World1');
});

app.post('/auth/login', handleValidationErrors, loginValidation, UserController.login);

/// check if fields before starts registerValidation
app.post('/auth/register', handleValidationErrors, registerValidation, UserController.register);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);

///checkAuth проверяет можно ли возвращать некоторые данные
///checkAuth сначало выполняется функция. а потом остальное
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/auth/me', checkAuth, UserController.getMe);

app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', postCreateValidation, PostController.update)


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})