const express = require("express");
const dbConnection = require('./DB/db');
const cors = require('cors');
const routes = require("./routes/authBook.routes")
const upload = require("./middleware/authBook.middleware")

const dotenv = require('dotenv');

dotenv.config();


dbConnection();

const app = express();

app.use(cors({origin : "https://ls-frontend-theta.vercel.app/"}))
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

//book upload routes


//all book fetch route
app.use("/api", routes) ;






app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));






