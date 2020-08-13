const express = require("express");
const mods = express.Router();

let products = [
    {
        id: 1,
        product: "Tardigrade",
        price: 1,
        quantity: 10
    },
    {
        id: 2,
        product: "Maned Wolf",
        price: 2,
        quantity: 9
    },
    {
        id: 3,
        product: "Sloth",
        price: 3,
        quantity: 8
    },
    {
        id: 4,
        product: "Eagle",
        price: 4,
        quantity: 7
    },
    {
        id: 5,
        product: "Red Panda",
        price: 5,
        quantity: 6
    },
    {
        id: 6,
        product: "Tapir",
        price: 6,
        quantity: 5
    },
    {
        id: 7,
        product: "Aardvark",
        price: 7,
        quantity: 4
    },
    {
        id: 8,
        product: "Goblin Shark",
        price: 8,
        quantity: 3
    },
    {
        id: 9,
        product: "Giant Squid",
        price: 9,
        quantity: 2
    }
];

mods.get("/", (req, res) => {
    res.sendStatus(200);
});

mods.get('/cart-items', (req, res) => {
    res.json({ products });
    res.sendStatus(200);
})

mods.get("/cart-items/:id", (req, res) => {
    const product = products.find((item) => item.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.json("ID Not Found")
        res.sendStatus(404);
    }

})

mods.post("/cart-items", (req, res) => {
    if (req.body && req.body.product && req.body.price && req.body.quantity) {
        products.push({ product: req.body.product, price: req.body.price, quantity: req.body.quantity, id: products.length + 1 });
        res.sendStatus(201);
    } else {
        res.json('something broke...');
    }
})

mods.put("/cart-items/:id", (req, res) => {
    const spot = products.findIndex((item) => item.id === parseInt(req.params.id));
    const spooki = products.find((item) => item.id === parseInt(req.params.id));
    spooki.product = req.body.product;
    spooki.price = req.body.price;
    spooki.quantity = req.body.quantity;
    res.sendStatus(200);
})


mods.delete("/cart-items/:id", (req, res) => {
    const spot = products.findIndex((item) => item.id === parseInt(req.params.id));
    products.splice(spot, 1);
    res.sendStatus(204);
})

module.exports = mods;