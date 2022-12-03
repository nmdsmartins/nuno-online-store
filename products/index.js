const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.json({
        baseUrl: req.baseUrl,
        url: req.url,
        method: req.method,
        path: req.path,
        headers: req.headers,
        query: req.query    ,
        cookies: req.cookies,
        mongodbUrl: process.env.DB_URL ?? "not found"
    });
    next();
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});