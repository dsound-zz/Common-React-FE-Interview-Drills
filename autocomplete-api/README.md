# Autocomplete API Drill

Implement an autocomplete that pulls fruit data from `https://www.fruityvice.com/api/fruit/all`.

## Requirements

- Controlled input with debounce (see `hooks/useDebounce.ts`)
- Fetch the API once and store the fruit list locally
- Filter the list by the debounced query
- Highlight matched text in dropdown items
- Keyboard navigation: use ArrowUp/ArrowDown to traverse, Enter to select, Escape to close
- Close the dropdown when clicking outside the component
- Display loading and error states

## Hints

1. Reuse the provided `useDebounce` hook for the search query.
2. Derive the filtered list (and open/selected state) from memoized values instead of duplicating logic.
3. Use `useRef` to capture the container for outside click detection.
4. Consider `aria` attributes (`role="listbox"`, `role="option"`, `aria-selected`) for accessibility.
5. You can keep the API request in a `useEffect` that runs once and guards against stale updates.

## Server & API

- Start the fruits API by running `npm start` inside the `fruits-server` folder so it listens on `http://localhost:3001`.
- The autocomplete should hit `http://localhost:3001/query?search=<term>` so the server can filter results via the `search` query value.
- Use the provided debounce hook to pause before firing the request; the server expects the final query string to do the filtering.
