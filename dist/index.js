"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
const requestLimit = process.env.LIMIT || '100kb';
app.use(body_parser_1.default.json({ limit: requestLimit }));
app.use(cors_1.default());
app.all('*', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, POST",
        "Access-Control-Allow-Headers": req.get("Access-Control-Request-Headers")
    });
    if (req.method === "OPTIONS") {
        res.send();
    }
    else {
        const targetURL = req.get('Target-URL');
        if (!targetURL) {
            res.status(500).json({ "message": "No 'Target-URL' Request Header specified" });
            return;
        }
        let headerData = {};
        if (req.headers.authorization) {
            headerData = {
                headers: {
                    'Authorization': req.headers.authorization,
                },
            };
        }
        node_fetch_1.default(targetURL, headerData)
            .then((serverResponse) => {
            serverResponse.body.pipe(res);
        })
            .catch(err => {
            res.status(500).json(err);
        });
    }
});
app.listen(port, () => {
    console.log(`Proxy running on port ${port}`);
});
//# sourceMappingURL=index.js.map