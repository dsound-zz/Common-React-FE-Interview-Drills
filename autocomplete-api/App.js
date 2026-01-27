"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useDebounce_1 = require("./hooks/useDebounce");
const API_URL = 'http://localhost:3001/query?search=';
function App() {
    const [query, setQuery] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)('idle');
    const debouncedQuery = (0, useDebounce_1.useDebounce)(query, 220);
    (0, react_1.useEffect)(() => {
        const payloadQuery = debouncedQuery || query;
        setStatus(`fetching fruits from ${API_URL}${payloadQuery}`);
    }, [query, debouncedQuery]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Autocomplete API (Boilerplate)" }), (0, jsx_runtime_1.jsx)("p", { className: "hint", children: "Use the Fruityvice `/api/fruit/all` endpoint, keep the input controlled, and add the keyboard/mouse behaviors described in the README." })] }));
}
exports.default = App;
//# sourceMappingURL=App.js.map