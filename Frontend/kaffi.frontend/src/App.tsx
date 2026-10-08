import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomeView } from './Views/HomeView'
import { AdminView } from './Views/AdminView'
import { RecView } from './Views/RecView'
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/admin" element={<ProtectedRoute><AdminView /></ProtectedRoute>} />
          <Route path="/rec" element={<RecView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App