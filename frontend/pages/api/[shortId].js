"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const next_1 = require("next");
async function handler(req, res) {
    // Proxy all requests to backend for /:shortId
    const { shortId } = req.query;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const resp = await fetch(`${apiUrl}/${shortId}`);
    const data = await resp.json();
    res.status(resp.status).json(data);
}
//# sourceMappingURL=%5BshortId%5D.js.map