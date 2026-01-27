"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const tabs = [
    { label: 'Tab 1', content: 'Content for Tab 1' },
    { label: 'Tab 2', content: 'Content for Tab 2' },
    { label: 'Tab 3', content: 'Content for Tab 3' }
];
function App() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "app", children: (0, jsx_runtime_1.jsx)("h1", { children: "Tabs" }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map