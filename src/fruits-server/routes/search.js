export default function setupSearchRoute(app, items) {
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