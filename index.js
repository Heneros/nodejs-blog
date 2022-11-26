import express from 'express';
import mongoose from 'mongoose';


import { DB_PASSWORD } from './keys.js';
import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';
// import { register, login, getMe } from './controllers/UserController';

//Все методы сохранить в UserController
import { UserController } from './controllers/index.js';

const app = express();

mongoose
    .connect(`mongodb+srv://admin:${DB_PASSWORD}@cluster0.mr4lmgx.mongodb.net/blog?retryWrites=true&w=majority`)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB error', err))

//express read json request data
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World1');
});

app.post('/auth/login', UserController.login);



/// check if fields before starts registerValidation
app.post('/auth/register', registerValidation, UserController.register);


///checkAuth проверяет можно ли возвращать некоторые данные
///checkAuth сначало выполняется функция. а потом остальное
app.get('/auth/me', checkAuth, UserController.getMe)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})