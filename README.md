# Drill Swap Helper

This repo keeps each practice drill in its own folder while the `src/` directory is the place your dev server actually reads from. When you want to switch exercises, the included Bash helper copies the drill’s files into `src/` for you.

## Quick start with `swap-drill.sh`

1. Run `npm install`
2. Choose a drill from the available list: `todo-list`, `autocomplete`, `sortable-table`, `pagination`, `timer`, `modal`, `grid-toggle`, `tabs`, `accordion`, `fetch-demo`.
3. Run `./swap-drill.sh <drill-name>` from the repo root; e.g. `./swap-drill.sh pagination`.
4. The script copies `main.tsx`, `App.tsx`, and `index.css` (if present) from that drill folder into `src/`, replacing what was there.
5. Run `npm run dev` (or your preferred Vite command) to start the dev server with the newly swapped drill.

## Keep your work safe

- Treat each drill swap as a checkpoint: commit your current progress or create a dedicated branch before running the script again so you can return to it later.
- After swapping, double-check `git status` / your branch name to ensure you’re not overwriting uncommitted changes.
- If you prefer, create one branch per drill (e.g., `drill-pagination`) or make a small commit after finishing each drill before swapping again.

## Notes

- The script only touches `src/`, so your drill folders stay untouched; you can always inspect the drill setup directly.
- If a drill lacks `index.css`, the script simply skips it and leaves the existing stylesheet in place.
# Common-React-FE-Interview-Drills
