'use strict'
const express = require('express');
const mods = require("./mods");
const cors = require("cors");

const app = express();
const route = express.Router();

app.use(express.json());
app.use(express.static(__dirname + "/dist"));
app.use(cors());
app.use("/", mods);

const port = 3000;
app.listen(port, ()=>{console.log('server listening on port ' + port)});