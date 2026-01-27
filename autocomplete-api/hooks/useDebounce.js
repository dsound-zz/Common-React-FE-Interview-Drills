"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = useDebounce;
const react_1 = require("react");
function useDebounce(value, delay = 250) {
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        const timer = window.setTimeout(() => setDebouncedValue(value), delay);
        return () => window.clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}
//# sourceMappingURL=useDebounce.js.map