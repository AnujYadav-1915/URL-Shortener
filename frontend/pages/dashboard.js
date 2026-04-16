"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const router_1 = require("next/router");
const qrcode_react_1 = __importDefault(require("qrcode.react"));
function Dashboard() {
    const [links, setLinks] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [stats, setStats] = (0, react_1.useState)({ total: 0, clicks: 0 });
    const router = (0, router_1.useRouter)();
    // Demo user info
    const user = { name: 'Demo User', email: 'demo@neonshort.com', plan: 'Free' };
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            void router.push('/login');
            return;
        }
        fetch('/api/links', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
            setLinks(data.links || []);
            setStats({
                total: data.links?.length || 0,
                clicks: data.links?.reduce((a, l) => a + l.click_count, 0) || 0,
            });
        })
            .finally(() => setLoading(false));
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { className: "flex min-h-screen", children: [(0, jsx_runtime_1.jsxs)("aside", { className: "hidden md:flex flex-col w-64 bg-[#232046] bg-opacity-90 p-6 gap-8 border-r border-[#2d2a4a]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-xl font-bold neon mb-8", children: ["\uD83D\uDC64 ", user.name] }), (0, jsx_runtime_1.jsxs)("nav", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsx)("a", { href: "/dashboard", className: "hover:underline", children: "Links" }), (0, jsx_runtime_1.jsx)("a", { href: "/account", className: "hover:underline", children: "Account" }), (0, jsx_runtime_1.jsx)("a", { href: "/pricing", className: "hover:underline", children: "Upgrade" })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-auto", children: (0, jsx_runtime_1.jsx)("button", { className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white w-full", onClick: () => { localStorage.removeItem('token'); window.location.href = '/login'; }, children: "Logout" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 p-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold neon mb-6", children: "Dashboard" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-6 mb-8 flex-wrap", children: [(0, jsx_runtime_1.jsxs)("div", { className: "card flex-1 text-center min-w-[180px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.total }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: "Links Created" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card flex-1 text-center min-w-[180px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.clicks }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: "Total Clicks" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card overflow-x-auto", children: [(0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "text-left", children: [(0, jsx_runtime_1.jsx)("th", { children: "Short URL" }), (0, jsx_runtime_1.jsx)("th", { children: "Original URL" }), (0, jsx_runtime_1.jsx)("th", { children: "Clicks" }), (0, jsx_runtime_1.jsx)("th", { children: "QR" }), (0, jsx_runtime_1.jsx)("th", { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: links.map(link => ((0, jsx_runtime_1.jsxs)("tr", { className: link.deleted ? 'opacity-50' : '', children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("a", { href: `/${link.short_id}`, className: "underline text-cyan-400", target: "_blank", rel: "noopener noreferrer", children: link.short_id }) }), (0, jsx_runtime_1.jsx)("td", { className: "truncate max-w-xs", children: link.url }), (0, jsx_runtime_1.jsx)("td", { children: link.click_count }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(qrcode_react_1.default, { value: `${window.location.origin}/${link.short_id}`, size: 32 }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("button", { className: "px-2 py-1 bg-blue-600 rounded text-white", onClick: () => navigator.clipboard.writeText(`${window.location.origin}/${link.short_id}`), children: "Copy" }) })] }, link.id))) })] }), loading && (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: "Loading..." })] })] })] }));
}
//# sourceMappingURL=dashboard.js.map