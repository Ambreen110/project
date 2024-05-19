import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ProductsContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInputContext } from "../../context/InputContext";

export default function Home() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { products, nearby_Stores, search_information } =
    useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddresses, setShowAddresses] = useState(false);
  const { inputValue, handleInputChange, searchResults, searchAPI } =
    useInputContext();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const toggleAddresses = () => {
    setShowAddresses(!showAddresses);
  };

  // Toast notifications
  const notifyAddedToCart = (item) =>
    toast.success(`${item.Title} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.Title} removed from cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  function handleStoreChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <ToastContainer />

      <div className="flex justify-between items-center p-4">
        {/* Cart Button */}
        <Link to="/cart">
  <button
    className={`bg-black text-white rounded-full p-3 flex items-center ${cartItems.length === 0 ? 'disabled' : 'bg-gray-300'}`}
    style={{ marginBottom: "20px" }}
    disabled={cartItems.length === 0}
  >
    <ShoppingCart size={24} className="mr-2" />
    Cart
  </button>
</Link>




        {/* Dropdown Menu */}
        <div
          className="dropdownmenuofhomepge"
          style={{
            marginRight: "50px",
          }}
        >
          <select
            onChange={handleStoreChange}
            style={{
              padding: "10px",
              border: "1px solid black",
            }}
          >
            <option value="">Select Nearby Store</option>
            {Array.isArray(nearby_Stores) &&
              nearby_Stores.slice(0, 5).map((product, id) => (
                <option key={id} value={product.store_id}>
                  {product.address}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg px-6 py-6 relative"
            style={{ maxWidth: "300px" }}
          >
            <img
              src={product.Thumbnail}
              alt={product.Title}
              className="rounded-md h-40"
            />
            <div className="mt-3">
              {product.Quantity_Left !== "N/A" && (
                <h2>
                  {product.Quantity_Left === 0
                    ? "Out of stock"
                    : `Left in stock: ${product.Quantity_Left}`}
                </h2>
              )}
              <h1 className="text-md truncate mt-2" title={product.Title}>
                {product.Title}
              </h1>
              <p className="mt-1 mb-4 text-center text-gray-600">
                ${product.Price}
              </p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              {!cartItems.find((item) => item.id === product.id) ? (
                <button
                  className={`px-2 mb-2 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${
                    product.Quantity_Left === 0
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                  onClick={() => {
                    addToCart(product);
                    notifyAddedToCart(product);
                  }}
                  disabled={product.Quantity_Left === 0}
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    +
                  </button>
                  <p className="text-gray-600">
                    {cartItems.find((item) => item.id === product.id).quantity}
                  </p>
                  <button
                    className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      const cartItem = cartItems.find(
                        (item) => item.id === product.id
                      );
                      if (cartItem.quantity === 1) {
                        handleRemoveFromCart(product);
                      } else {
                        removeFromCart(product);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
