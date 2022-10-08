import express from 'express';


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World1');
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Server work')
    }
})