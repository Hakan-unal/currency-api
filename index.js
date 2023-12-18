const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config();

const app = express();

// using morgan for logs
app.use(morgan('combined'));

const api_URL= `https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.S.YTL&startDate=02-01-2005&endDate=01-02-2017&type=xml&key=${process.env.TCMB_API_KEY}&aggregationTypes=avg&formulas=1&frequency=8`

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: "The Words That I Know API - Swagger" };


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument,options));

app.get('/', async(req, res) => {
    res.send("Hello World");

});


app.get('/tcmb', async(req, res) => {

     fetch(api_URL).then((response)=>{
        res.send(response)
     }).catch(
        res.send("err")

     )

});


app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});



module.exports = app