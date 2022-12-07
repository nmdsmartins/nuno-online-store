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
             }
        ]
    });
    next();
});

app.listen(3090, () => {
    console.log("Server running on port 3090, wating for requests....");
});