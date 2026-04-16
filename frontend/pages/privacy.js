"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Privacy;
const jsx_runtime_1 = require("react/jsx-runtime");
const Section_1 = __importDefault(require("../components/Section"));
function Privacy() {
    return ((0, jsx_runtime_1.jsx)(Section_1.default, { title: "Privacy Policy", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl mx-auto text-gray-200", children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-4", children: "We value your privacy. NeonShort does not sell your data and complies with GDPR and other privacy regulations. All analytics are anonymized and you can delete your account at any time." }), (0, jsx_runtime_1.jsxs)("ul", { className: "list-disc list-inside mb-4", children: [(0, jsx_runtime_1.jsx)("li", { children: "We only collect data necessary for link analytics and account management." }), (0, jsx_runtime_1.jsx)("li", { children: "Your data is encrypted and never shared with third parties." }), (0, jsx_runtime_1.jsx)("li", { children: "You can export or delete your data from your account page." })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Contact ", (0, jsx_runtime_1.jsx)("a", { href: "mailto:privacy@neonshort.com", className: "underline", children: "privacy@neonshort.com" }), " for any privacy-related questions."] })] }) }));
}
//# sourceMappingURL=privacy.js.map