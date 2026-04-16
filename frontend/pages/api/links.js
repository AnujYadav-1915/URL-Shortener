"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const next_1 = require("next");
async function handler(req, res) {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ error: 'No token' });
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const resp = await fetch(`${apiUrl}/links`, {
        headers: { Authorization: token },
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
}
//# sourceMappingURL=links.js.map