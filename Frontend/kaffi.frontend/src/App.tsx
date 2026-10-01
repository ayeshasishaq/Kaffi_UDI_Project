import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomeView } from './Views/HomeView'
import { AdminView } from './Views/AdminView'
import { CoffeeView } from './Views/CoffeeView'
import {fetchData} from './API/Api_kaffi'


function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>

        
          <Route path="/" element={ <HomeView/>}/>
          <Route path="/admin" element={ <AdminView/> } />
          <Route path="/coffee/:id" element= { <CoffeeView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
