"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function FeatureCard({ icon, title, description }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card flex flex-col items-center text-center gap-2 p-6 min-w-[220px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-4xl mb-2", children: icon }), (0, jsx_runtime_1.jsx)("div", { className: "text-xl font-bold mb-1", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-300", children: description })] }));
}
//# sourceMappingURL=FeatureCard.js.map