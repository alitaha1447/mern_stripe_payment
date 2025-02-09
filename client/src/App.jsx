
import Header from "./components/Header"
import Home from "./components/Home"
import CartDetails from "./components/CartDetails"
import Success from "./components/Success"
import {Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="cart" element={<CartDetails/>}/>
        <Route path="success" element={<Success/>}/>
        {/* <Route path="cart" element={<CartDetails/>}/> */}
      </Routes>
    </>
  )
}

export default App
