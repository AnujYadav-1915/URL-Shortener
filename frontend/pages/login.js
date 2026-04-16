"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const router_1 = require("next/router");
function Login() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            }
            else {
                alert('Login failed: ' + data.error);
            }
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("main", { className: "flex flex-col items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "card w-full max-w-md flex flex-col gap-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold neon mb-2 text-center", children: "Sign in to NeonShort" }), (0, jsx_runtime_1.jsxs)("button", { className: "bg-white text-black px-4 py-2 rounded font-bold flex items-center justify-center gap-2 border border-gray-300", disabled: true, children: [(0, jsx_runtime_1.jsx)("img", { src: "/google.svg", alt: "Google", className: "w-5 h-5" }), " Sign in with Google"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 my-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-px bg-gray-400" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-300 text-xs", children: "or" }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-px bg-gray-400" })] }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Email", value: email, onChange: e => setEmail(e.target.value), className: "px-2 py-1 rounded text-black" }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Password", type: "password", value: password, onChange: e => setPassword(e.target.value), className: "px-2 py-1 rounded text-black" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogin, disabled: loading, className: "bg-gradient-to-r from-purple-500 to-blue-500 neon px-4 py-2 rounded text-white font-bold", children: loading ? 'Loading...' : 'Sign In' }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center text-gray-300 mt-2", children: ["Don't have an account? ", (0, jsx_runtime_1.jsx)("a", { href: "/signup", className: "underline", children: "Sign Up" })] })] }) }));
}
//# sourceMappingURL=login.js.map