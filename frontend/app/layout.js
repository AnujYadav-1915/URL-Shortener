"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const google_1 = require("next/font/google");
require("../styles/globals.css");
const inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'NeonShort - Modern URL Shortener',
    description: 'A vibrant, scalable, Bitly-inspired URL shortener SaaS.',
};
const Navbar_1 = __importDefault(require("../components/Navbar"));
const Footer_1 = __importDefault(require("../components/Footer"));
function RootLayout({ children }) {
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", children: (0, jsx_runtime_1.jsxs)("body", { className: `${inter.className} bg-gradient-to-br from-[#1a1832] to-[#2d2a4a] text-white min-h-screen`, children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "pt-20 min-h-[80vh]", children: children }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }) }));
}
//# sourceMappingURL=layout.js.map