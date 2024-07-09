import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.json({ message: 'HELLO FROM NODE.JS!' });
});

app.listen(8888, (err) => {
    if (err) {
        console.error(err);
    }
});