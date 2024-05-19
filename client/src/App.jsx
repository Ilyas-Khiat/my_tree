import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import { Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import FamilyDashboard from './Components/familytree/FAMILY_DASHBOARD'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'



function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Home />}></Route>
        <Route path = "/signup" element={<Signup />}></Route>
        <Route path = "/login" element={<Login />}></Route>
        <Route path="/familytree" element={<FamilyDashboard  />} />
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
