import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { DB_PASSWORD } from './keys.js';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';

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

app.post('/auth/login', async (req, res) => {
    try {

        //Check user
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        //Check password
        const inValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!inValidPass) {
            return res.status(400).json({
                message: "Password or user are wrong"
            });
        }

        const token = jwt.sign(
            {
                _id: user._id, //must fit with id in database, 
            },
            'secret123',
            {
                expiresIn: '30d' //token stop be valid
            },
        );

        const { passwordHash, ...useData } = user._doc;

        res.json({
            ...useData,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to authorize.',
        });
    }
});



/// check if fields before starts registerValidation
app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id, //must fit with id in database, 
            },
            'secret123',
            {
                expiresIn: '30d' //token stop be valid
            },
        );


        const { passwordHash, ...useData } = user._doc;

        res.json({
            ...useData,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register.',
        });
    }
});


///checkAuth проверяет можно ли возвращать некоторые данные
///checkAuth сначало выполняется функция. а потом остальное
app.get('/auth/me', checkAuth, (req, res) => {
    try {
        res.json({
            success: true
        });
    } catch (err) {

    }
})


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})