"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const items = [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Section 3', content: 'Content for section 3' }
];
function App() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "app", children: (0, jsx_runtime_1.jsx)("h1", { children: "Accordion" }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map