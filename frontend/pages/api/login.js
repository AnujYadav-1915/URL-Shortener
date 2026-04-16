"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const next_1 = require("next");
async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const resp = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
}
//# sourceMappingURL=login.js.map