const express = require("express");
const fs = require("fs/promises");

const server = express();
server.use(express.json());
server.use(express.static("../public"));

server.get("/points", async (req, res) => {
    const dataRaw = await fs.readFile("../data.json");
    res.json(JSON.parse(dataRaw));
});

server.listen(3001, () => console.log("Server online."));
