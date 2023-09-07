//config inicial
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//forma de ler JSON / middlewares
app.use( //criar middlwares
    express.urlencoded({ //ler json
        extended: true,
    }),
)

app.use(express.json());

//rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//Rota inicial / endpoint
app.get('/', (req, res) => {

    //mostrar req
    res.json({ message: 'Oi Express!' })
})


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

//entregar uma porta
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.04ryszt.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


