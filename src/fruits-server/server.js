import express from "express";
import cors from "cors";
import setupSearchRoute from "./routes/search.js";

const app = express();
app.use(cors());

const items = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Blueberry',
  'Cherry', 'Coconut', 'Cranberry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape', 'Grapefruit', 'Guava',
  'Kiwi',
  'Lemon', 'Lime', 'Lychee',
  'Mango', 'Melon',
  'Orange',
  'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum',
  'Raspberry',
  'Strawberry',
  'Watermelon'
];

setupSearchRoute(app, items);

app.listen(3001, () => {
  console.log("API server running at http://localhost:3001");
});
