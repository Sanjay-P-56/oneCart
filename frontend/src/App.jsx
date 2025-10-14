import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registeration from "./pages/Registeration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav2 from "./component/Nav2";

import { userDataContext } from "./context/UserContext";
import Product from "./pages/Product";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Ai from "./component/Ai";

function App() {
  let { userData } = useContext(userDataContext);
  let location=useLocation()
  return (
    <>
      {userData && <Nav2/>}
     
        <>
          <Routes>
            <Route path="/signup" element={userData?(<Navigate to={location.state?.from || "/"}/>) : (<Registeration/>)} />

            <Route path="/login" element={userData?(<Navigate to={location.state?.from || "/"}/>) : <Login/>} />

            <Route path="/" element={userData ? <Home/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/product" element={userData ? <Product/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/about" element={userData ? <About/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/collections" element={userData ? <Collections/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/contact" element={userData ? <Contact/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/productdetail/:productId" element={userData ? <ProductDetail/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/cart" element={userData ? <Cart/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/placeorder" element={userData ? <PlaceOrder/> : <Navigate to="/login" state={{from: location.pathname}}/>} />

            <Route path="/order" element={userData ? <Order/> : <Navigate to="/login" state={{from: location.pathname}}/>} />
            
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Ai/>
        </>
      
    </>
  );
}

export default App;
