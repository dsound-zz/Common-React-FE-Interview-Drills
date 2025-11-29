export default function setupSearchRoute(app, items) {
  app.get("/search", (req, res) => {
    const query = (req.query.query || "").toString().trim();

    if (!query) {
      return res.json([]);               // return empty list if no query
    }

    const q = query.toLowerCase();

    // Case-insensitive filtering
    const results = items.filter(item =>
      item.toLowerCase().includes(q)
    );

    res.json(results);
  });

  app.get("/query", (req, res) => {
    const search = (req.query.search || "").toString().trim();

    if (!search) {
      return res.json([]);               // return empty list if no query
    }

    const q = search.toLowerCase();

    // Case-insensitive filtering
    const results = items.filter(item =>
      item.toLowerCase().includes(q)
    );

    res.json(results);
  });
}