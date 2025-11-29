import { useEffect, useMemo, useState } from 'react';

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
]

const highlightedText = (text: string, query: string) => {
  if (!query) return text;
  
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);
  
  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  );
}

const normalize = (str: string) => str.toLocaleLowerCase()

const matches = (item: string, query: string) => normalize(item).includes(normalize(query))

const isExactMatch = (query: string) => items.some(item => normalize(item) === normalize(query))


function App() {
  const [query, setQuery] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)


  useEffect(() => {
    if (!query) {
      setIsOpen(false)
      return
    }

    if (isExactMatch(query)) {
      setIsOpen(false)
      return
    }

    setIsOpen(true)
  }, [query])

  const filteredItems = useMemo(() => {
    if (!query) return []  
    return items.filter((item) => matches(item, query))
  }, [query])

  return (
    <div className="app">
      <h1>Autocomplete</h1>
      <div className="container">
        <input value={query} onChange={(e) => { 
          setQuery(e.target.value);
          setIsOpen(true)
          } } />
        {isOpen ? (
        <ul>
          {filteredItems?.map((item) => (
          <li key={item} className="item" onClick={() => {
            setQuery(item);
          }}
            >
              {highlightedText(item, query)}</li>
          ))}
        </ul>
        ) : null}
    </div>
    </div>
  )
}

export default App
