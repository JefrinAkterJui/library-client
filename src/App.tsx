import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
    </>
  )
}

export default App
