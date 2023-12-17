const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

// using morgan for logs
app.use(morgan('combined'));


app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Hello World");
});


app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});



module.exports = app