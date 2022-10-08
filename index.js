import express from 'express';
import jwt from 'jsonwebtoken';
import moongoose from 'moongoose';
import { DB_PASSWORD } from './keys.js';



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

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    // {
    //     "email": "test@example.com",
    //     "password": "qwerty"
    // }
    if (req.body.email === 'test@example.com') {
        const token = jwt.sign(
            {
                email: req.body.email,
                fullName: 'qwerty'
            },
            'testsecret'
        )
    }
    res.json({
        success: true,
        token
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})