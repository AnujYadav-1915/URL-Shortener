"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Contact;
const jsx_runtime_1 = require("react/jsx-runtime");
const Section_1 = __importDefault(require("../components/Section"));
function Contact() {
    return ((0, jsx_runtime_1.jsxs)(Section_1.default, { title: "Contact Us", children: [(0, jsx_runtime_1.jsxs)("form", { className: "max-w-lg mx-auto flex flex-col gap-4 card", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Your Name", className: "px-2 py-1 rounded text-black", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Your Email", className: "px-2 py-1 rounded text-black", required: true }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "How can we help you?", className: "px-2 py-1 rounded text-black", rows: 5, required: true }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold", children: "Send Message" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center mt-6 text-gray-300", children: ["Or email us at ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:support@neonshort.com", className: "underline", children: "support@neonshort.com" })] })] }));
}
//# sourceMappingURL=contact.js.map