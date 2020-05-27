"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const express = require("express");
const app = express();
app.listen(port, () => {
    console.log(`Proxy running on port ${port}`);
});
//# sourceMappingURL=index.js.map