"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Account;
const jsx_runtime_1 = require("react/jsx-runtime");
const Section_1 = __importDefault(require("../components/Section"));
function Account() {
    // In a real app, fetch user info from API
    const user = { name: 'Demo User', email: 'demo@neonshort.com', plan: 'Free' };
    return ((0, jsx_runtime_1.jsx)(Section_1.default, { title: "Account Settings", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-lg mx-auto card flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm mb-1", children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: user.name, className: "px-2 py-1 rounded text-black w-full", disabled: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", value: user.email, className: "px-2 py-1 rounded text-black w-full", disabled: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm mb-1", children: "Plan" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: user.plan, className: "px-2 py-1 rounded text-black w-full", disabled: true })] }), (0, jsx_runtime_1.jsx)("button", { className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold", children: "Upgrade Plan" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-red-600 px-4 py-2 rounded text-white font-bold", children: "Delete Account" })] }) }));
}
//# sourceMappingURL=account.js.map