import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart/Cart";
import Header from "./components/navbar/Header";
import Login from "./pages/login/Login";
import { LocationProvider } from "./context/LocationContext";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { ProductsProvider } from "./context/ProductsContext";
import { InputProvider } from "./context/InputContext";

const Layout = ({ children, onDataChangeReal }) => {
  return (
    <>
      <Header onDataChangeReal={onDataChangeReal} />
      {children}
    </>
  );
};

function App() {
  const [location, setLocation] = useState({
    location: "New York",
    latitude: 40.7128,
    longitude: -74.0059,
  });
  const [data, setData] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyADK8xk_oOqBNiZJjqeYyTevJ3CfYhIHgk",
  });
  const onDataChangeReal = (newData) => {
    console.log("Data changed:", newData);
    setData(newData);
  };

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <ProductsProvider>
      <InputProvider>
        <CartProvider>
          <LocationProvider
            initialLocation={location}
            updateLocation={updateLocation}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/home/*"
                  element={
                    <Layout onDataChangeReal={onDataChangeReal}>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Layout onDataChangeReal={onDataChangeReal}>
                      <Cart isLoaded={isLoaded} loadError={loadError} />
                    </Layout>
                  }
                />

              </Routes>
            </BrowserRouter>
          </LocationProvider>
        </CartProvider>
      </InputProvider>
    </ProductsProvider>
  );
}

export default App;
