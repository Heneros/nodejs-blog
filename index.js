import express from 'express';
import jwt from 'jsonwebtoken';
import moongoose from 'moongoose';
import { DB_PASSWORD } from './keys.js';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';

const app = express();

moongoose
    .connect(`mongodb+srv://admin:${DB_PASSWORD}@cluster0.mr4lmgx.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB error', err))

//express read json request data
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World1');
});
/// check if fields before starts registerValidation
app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.json({
        success: true,
    })
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})