import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [
  { id: ``, name: "Eat", completed: true},
  { id: 2, name: "Sleep", completed: false},
  { id: 3, name: "Repeat", completed: false}
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
