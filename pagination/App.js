"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const items = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);
const ITEMS_PER_PAGE = 10;
function App() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "app", children: (0, jsx_runtime_1.jsx)("h1", { children: "Pagination" }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map