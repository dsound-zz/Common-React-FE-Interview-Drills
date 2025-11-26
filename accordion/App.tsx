
interface AccordionItem {
  title: string
  content: string
}

const items: AccordionItem[] = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' }
]

function App() {


  
  return (
    <div className="app">
      <h1>Accordion</h1>
    </div>
  )
}

export default App
