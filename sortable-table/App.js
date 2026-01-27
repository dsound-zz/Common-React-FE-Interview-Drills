"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'David', age: 28 },
    { id: 5, name: 'Eve', age: 32 }
];
function App() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "app", children: (0, jsx_runtime_1.jsx)("h1", { children: "Sortable Table" }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map