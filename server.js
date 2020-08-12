'use strict'
const express = require('express');
const route = express.Router();
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


const mods = require("./mods");
app.use("/", mods);






app.listen(port, ()=>{console.log('server listening on port ' + port)});