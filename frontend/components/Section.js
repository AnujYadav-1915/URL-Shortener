"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Section;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Section({ title, children, className = '' }) {
    return ((0, jsx_runtime_1.jsxs)("section", { className: `w-full max-w-5xl mx-auto my-16 px-4 ${className}`, children: [title && (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold neon mb-6 text-center", children: title }), (0, jsx_runtime_1.jsx)("div", { children: children })] }));
}
//# sourceMappingURL=Section.js.map