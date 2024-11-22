const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
   extended: true
}));

dotenv.config({ path: '.env' });

app.use('/products', require('./src/routes/productsRouter'));
app.use('/stock', require('./src/routes/stockRouter'));
app.use('/shop', require('./src/routes/shopRouter'))

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});