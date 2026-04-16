"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DemoShortener;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function DemoShortener() {
    const [url, setUrl] = (0, react_1.useState)('');
    const [shortUrl, setShortUrl] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleShorten = async () => {
        setLoading(true);
        setShortUrl('');
        try {
            const res = await fetch('/api/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });
            const data = await res.json();
            if (res.ok)
                setShortUrl(`${window.location.origin}/${data.shortId}`);
            else
                alert('Error: ' + data.error);
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-xl card flex flex-col gap-4 mx-auto", children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "Paste your long link here", value: url, onChange: e => setUrl(e.target.value), className: "text-black px-2 py-1 rounded" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleShorten, disabled: loading, className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white", children: loading ? 'Shortening...' : 'Shorten URL' }), shortUrl && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Short URL: " }), (0, jsx_runtime_1.jsx)("a", { href: shortUrl, className: "underline text-cyan-400", target: "_blank", rel: "noopener noreferrer", children: shortUrl })] }))] }));
}
//# sourceMappingURL=DemoShortener.js.map