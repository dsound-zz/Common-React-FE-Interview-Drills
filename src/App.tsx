import { useState } from "react"

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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleOpenAccordian = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null)
      return
    }
    setOpenIndex(idx)
  }
  return (
    <div className="app">
      <h1>Accordion</h1>
      <div className="container">
        {items.map((item, index) => {
          const isOpen = index === openIndex
          return (
          <div key={item.title} className={`item ${isOpen ? "open" : ""}`}>
            <div className="heading-row">
            <h3 className="title" onClick={() => handleOpenAccordian(index)}>{item.title}</h3><span>{isOpen ? "-" : "+"}</span></div>
            {isOpen ? (   
            <p className="content">{item.content}</p>
            ) : null}
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
