"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const next_1 = require("next");
async function handler(req, res) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const { id } = req.query;
    const resp = await fetch(`${apiUrl}/analytics/${id}`);
    const data = await resp.json();
    res.status(resp.status).json(data);
}
//# sourceMappingURL=%5Bid%5D.js.map