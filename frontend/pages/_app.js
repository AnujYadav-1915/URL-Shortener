"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/globals.css");
function App({ Component, pageProps }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Component, { ...pageProps }) }));
}
//# sourceMappingURL=_app.js.map