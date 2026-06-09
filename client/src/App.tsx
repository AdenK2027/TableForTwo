import { useState } from 'react'
import './App.css'

function App() {

  const [groceryListOut, setGroceryListOut] = useState(false);

  return (
    <div className="mainFrame">
      <h1>Table For Two</h1>
      <div className={`groceryListContainer ${groceryListOut ? 'open' : ''}`}
      onClick={() => {
        setGroceryListOut(!groceryListOut);
      }}>
        <img src="/assets/GroceryList.png" className="groceryList"></img>
      </div>
    </div>
  )
}

export default App
