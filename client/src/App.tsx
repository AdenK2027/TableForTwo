import { useState } from 'react'
import './App.css'
import Item from './item';
import GroceryList from './groceryList'

// ─── Customize the list here ─────────────────────────────────────────────────
const myConfig = {
  colors: {
    paper:  '#fcfeff',  // Warm, aged parchment paper
    lines:  '#8C6D53',  // Faded sepia ink for lines + dividers
    text:   '#232f65',  // Deep espresso brown for readable headers
    title:  '#4d6196',  // light blue for the "GROCERY LIST" title
  },
  fonts: {
    title:   '"Ephesis",',  // Now unified with the main title
    headers: '"Ephesis",',
    items:   '"Ephesis", cursive',
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

const pinColors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#ec4899"]

function getRandomColor() {
  return pinColors[Math.floor(Math.random() * pinColors.length)]
}

function App() {
  const [groceryListOut, setGroceryListOut] = useState(false);

  const rotations = [-6, 4, -3, 7, -8, 2];
  const [pins] = useState(() => rotations.map(() => getRandomColor()))

  return (
    <div className="mainFrame">
      <div className="title" style={{ position: "relative", display: "inline-block" }}>
        <span className="title">
          Table For Two
        </span>
        <span className="title front">
          Table For Two
        </span>
      </div>
      <div
        className={`groceryListContainer ${groceryListOut ? 'open' : ''}`}
        onClick={() => setGroceryListOut(!groceryListOut)}
      >
        <GroceryList config={myConfig} items={myItems} />
      </div>
      <div className="items">
        {rotations.map((deg, i) => (
          <Item key={i} rotation={deg} pinColor={pins[i]} />
        ))}
      </div>
    </div>
  )
}

export default App

