import { useState } from 'react'
import './App.css'
import GroceryList from './groceryList'

// ─── Customize the list here ─────────────────────────────────────────────────
const myConfig = {
  colors: {
    paper:  '#F2EBD9',  // Warm, aged parchment paper
    lines:  '#8C6D53',  // Faded sepia ink for lines + dividers
    text:   '#4A3525',  // Deep espresso brown for readable headers
    title:  '#2C4A3E',  // Sage/Forest green for the "GROCERY LIST" title
  },
  fonts: {
    title:   '"Caveat", cursive',  // Now unified with the main title
    headers: '"Caveat", cursive',
    items:   '"Caveat", cursive',
  },
  sizes: {
    width: 480, height: 680, rowHeight: 26, 
    headerFontSize: 18, titleFontSize: 24, itemFontSize: 16, 
  },
}

// ─── Put your grocery items here ─────────────────────────────────────────────
const myItems = {
  produce:  ['apples', 'spinach', 'carrots'],
  cold:     ['whole milk', 'cheddar'],
  meat:     ['chicken thighs'],
  bread:    ['sourdough'],
  pantry:   ['olive oil', 'pasta'],
  freezer:  ['peas'],
  home:     [],
}

function App() {
  const [groceryListOut, setGroceryListOut] = useState(false)

  return (
    <div className="mainFrame">
      <h1>Table For Two</h1>
      <div
        className={`groceryListContainer ${groceryListOut ? 'open' : ''}`}
        onClick={() => setGroceryListOut(!groceryListOut)}
      >
        <GroceryList config={myConfig} items={myItems} />
      </div>
    </div>
  )
}

export default App