"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
function Navbar({ user }) {
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "w-full flex items-center justify-between px-8 py-4 bg-[#232046] bg-opacity-90 shadow-lg fixed top-0 left-0 z-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "text-2xl font-bold neon", children: "NeonShort" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/dashboard", className: "ml-6 hover:underline", children: "Dashboard" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/pricing", className: "ml-4 hover:underline", children: "Pricing" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/contact", className: "ml-4 hover:underline", children: "Contact" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: user ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-semibold", children: ["Hi, ", user.name] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/account", className: "hover:underline", children: "Account" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white", onClick: () => { localStorage.removeItem('token'); window.location.href = '/login'; }, children: "Logout" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "hover:underline", children: "Login" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/signup", className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white", children: "Sign Up" })] })) })] }));
}
//# sourceMappingURL=Navbar.js.map