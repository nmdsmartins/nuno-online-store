const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.json({
        change: "1.20",
        products: [
            { 
                id: 1,
                name: "Esparguete",
                brand: "Milanesa"
             },
             { 
                id: 2,
                name: "Fiambre",
                brand: "Campofrio"
             },
             { 
                id: 3,
                name: "Manteiga",
                brand: "Planta"
             },
             { 
                id: 4,
                name: "Leite Magro",
                brand: "Pingo Doce"
             },
             { 
                id: 5,
                name: "Margarina",
                brand: "Pingo Doce"
             }
        ]
    });
    next();
});

app.listen(5002, () => {
    console.log("Server running on port 3090, wating for requests....");
});