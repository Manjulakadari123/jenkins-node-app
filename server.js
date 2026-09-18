const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello from Jenkins CI/CD Pipeline!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
});
