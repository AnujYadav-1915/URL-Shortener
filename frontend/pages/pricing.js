"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pricing;
const jsx_runtime_1 = require("react/jsx-runtime");
const Section_1 = __importDefault(require("../components/Section"));
const plans = [
    {
        name: 'Free',
        price: '$0',
        features: [
            'Unlimited short links',
            'Basic analytics',
            'QR code generation',
            'Community support',
        ],
        cta: 'Sign Up Free',
        highlight: false,
    },
    {
        name: 'Pro',
        price: '$9/mo',
        features: [
            'Branded links',
            'Advanced analytics',
            'Custom domains',
            'Team collaboration',
            'Priority support',
        ],
        cta: 'Start Pro',
        highlight: true,
    },
    {
        name: 'Business',
        price: 'Contact Us',
        features: [
            'Enterprise SSO',
            'Custom integrations',
            'Dedicated manager',
            'SLAs & compliance',
        ],
        cta: 'Contact Sales',
        highlight: false,
    },
];
function Pricing() {
    return ((0, jsx_runtime_1.jsx)(Section_1.default, { title: "Pricing", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap justify-center gap-8", children: plans.map(plan => ((0, jsx_runtime_1.jsxs)("div", { className: `card flex flex-col items-center w-72 ${plan.highlight ? 'border-2 border-blue-400 scale-105' : ''}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold mb-2", children: plan.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-extrabold mb-4", children: plan.price }), (0, jsx_runtime_1.jsx)("ul", { className: "mb-4 text-left w-full list-disc list-inside", children: plan.features.map(f => (0, jsx_runtime_1.jsx)("li", { children: f }, f)) }), (0, jsx_runtime_1.jsx)("a", { href: plan.name === 'Business' ? '/contact' : '/signup', className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold w-full text-center", children: plan.cta })] }, plan.name))) }) }));
}
//# sourceMappingURL=pricing.js.map