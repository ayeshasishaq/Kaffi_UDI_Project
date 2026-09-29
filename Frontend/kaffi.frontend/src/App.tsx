import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomeView } from './Views/HomeView'
import { AdminView } from './Views/AdminView'
import { CoffeeRecView } from './Views/CoffeeRecView'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomeView/> } />
          <Route path="/admin" element={ <AdminView/> } />
          <Route path="/coffee" element= { <CoffeeRecView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
