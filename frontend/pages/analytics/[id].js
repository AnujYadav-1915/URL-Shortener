"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Analytics;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const router_1 = require("next/router");
const recharts_1 = require("recharts");
function Analytics() {
    const [data, setData] = (0, react_1.useState)({});
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    (0, react_1.useEffect)(() => {
        if (!id)
            return;
        fetch(`/api/analytics/${id}`)
            .then(res => res.json())
            .then(setData);
    }, [id]);
    const clickTrends = data.analytics?.map((a) => ({
        date: new Date(a.timestamp).toLocaleDateString(),
        clicks: 1,
    })) || [];
    const deviceData = [
        { name: 'Mobile', value: data.analytics?.filter((a) => a.device === 'mobile').length || 0 },
        { name: 'Desktop', value: data.analytics?.filter((a) => a.device === 'desktop').length || 0 },
    ];
    const countryData = Object.entries(data.analytics?.reduce((acc, a) => {
        acc[a.country] = (acc[a.country] || 0) + 1;
        return acc;
    }, {}) || {}).map(([name, value]) => ({ name, value }));
    return ((0, jsx_runtime_1.jsxs)("main", { className: "min-h-screen p-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold neon mb-6", children: "Analytics" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-bold mb-2", children: "Click Trends" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 200, children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, { data: clickTrends, children: [(0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "date" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { allowDecimals: false }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "monotone", dataKey: "clicks", stroke: "#7f5fff", strokeWidth: 2 })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-bold mb-2", children: "Device Breakdown" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 200, children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsxs)(recharts_1.Pie, { data: deviceData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 60, fill: "#8884d8", label: true, children: [(0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: "#00e6ff" }, "mobile"), (0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: "#7f5fff" }, "desktop")] }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card md:col-span-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-bold mb-2", children: "Location Distribution" }), (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 200, children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: countryData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, fill: "#7f5fff", label: true }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) })] })] })] }));
}
//# sourceMappingURL=%5Bid%5D.js.map