const express = require("express");
const mods = express.Router();
const pool = require('./pg-connection-pool');

function getTable(req,res){
    pool.query("select * from shopping_cart order by id").then(result =>
    {
        res.json(result.rows);
    });
}


mods.get("/", (req, res) => {
    res.sendStatus(200);
});

mods.get('/cart-items', (req, res) => {
    if(!req.query.maxPrice&&!req.query.prefix&&!req.query.pageSize)
    {
        getTable(req,res);
    }else if(req.query.maxPrice)
    {
        pool.query("SELECT * FROM shopping_cart where price <= $1::int", [req.query.maxPrice]).then(result =>
        {
            res.json(result.rows);
        });
    }else if(req.query.prefix)
    {
        pool.query("SELECT * FROM shopping_cart WHERE products LIKE $1::text", [req.query.prefix]).then(result =>
        {
            res.json(result.rows);
        });
    }else
    {
        pool.query("SELECT * FROM shopping_cart LIMIT $1::int", [req.query.pageSize]).then(result =>
        {
            res.json(result.rows);
        });
    }
})

mods.get("/cart-items/:id", (req, res) => {
    pool.query("select * from shopping_cart where id=$1::int order by id", [req.params.id]).then(result =>
    {
        if(result)
        {
            res.status(200).json(result.rows);
        }else{
            res.sendStatus(404);
        }
    });
})


mods.post("/cart-items", (req, res) => {
    pool.query("insert into shopping_cart (product, price, quantity) values($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(result =>
        {
            res.status(201).json(result.rows);
        });
})


mods.put("/cart-items/:id", (req, res) => {
    pool.query("update shopping_cart set product=$1::text and set price=$2::int and set quantity=$3::int WHERE id=$4::int", [req.body.product, req.body.price, req.body.quantity]).then(result =>
        {
            res.status(200).json(result.rows);
        });
})


mods.delete("/cart-items/:id", (req, res) => {
    pool.query("delete from shopping_cart  WHERE id=$1::int", [req.query.id]).then(result =>
        {
            res.setStatus(200);
        });
})

module.exports = mods;