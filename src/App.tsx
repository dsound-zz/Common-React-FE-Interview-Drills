import { useCallback, useState } from 'react'

interface AccordionItem {
  title: string
  content: string
}

const items: AccordionItem[] = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' },
]

export default function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const isOpen = (index: number) => openIndex === index

  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  return (
    <div className="app">
      <h1>Accordion</h1>
      <div className="accordian">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`card ${isOpen(index) ? 'open' : ''}`}
            aria-expanded={isOpen(index)}
          >
            <h2 onClick={() => toggle(index)}>
              {item.title}
              <span>{isOpen(index) ? '−' : '+'}</span>
            </h2>
            {isOpen(index) ? (
              <div className="content">{item.content}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
