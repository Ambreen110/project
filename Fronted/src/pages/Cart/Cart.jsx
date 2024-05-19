import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import MapComponent from "../../components/location/map";
import "./Cart.css";
import { LocationContext } from "../../context/LocationContext";
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const Cart = ({ isLoaded, loadError }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const { selectedLocation, setLocation } = useContext(LocationContext);
  const [showMap, setShowMap] = useState(false);
  let navigate = useNavigate();

  const stripePromise = loadStripe(import.meta.env.STRIPE_KEY);

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.STRIPE_KEY);
    const result = await stripe.redirectToCheckout({
      paymentMethods: ['card', 'alipay', 'ideal', 'sofort', 'giropay', 'bacs', 'sepa', 'au_becs', 'p24', 'eps', 'bancontact', 'oxxo', 'boleto', 'mercadopago', 'klarna', 'ach', 'grabpay'],
      billingAddressCollection: 'auto',
    });
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="flex">
  {/* Cart Container */}
  <div className="flex flex-col flex-1 p-4">
    <h1 className="text-2xl font-bold">Cart</h1>
    <div className="flex flex-col gap-4">
      {cartItems.map((item) => (
        <div className="flex justify-between items-center" key={item.id}>
          <div className="flex gap-4">
            <img src={item.Thumbnail} alt={item.Title} className="rounded-md w-24 h-24" />
            <div className="flex gap-8 justify-center">
              <h1 className="text-lg font-bold">{item.Title}</h1>
              <p className="text-gray-600">${item.Price}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                addToCart(item);
              }}
            >
              +
            </button>
            <p>{item.quantity}</p>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                const cartItem = cartItems.find((product) => product.id === item.id);
                if (cartItem.quantity === 1) {
                  handleRemoveFromCart(item);
                } else {
                  removeFromCart(item);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
    {cartItems.length > 0 ? (
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
        <div className="flex flex-1 px-2 gap-4">
          <button
            className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase rounded hover:bg-red-500 focus:outline-none focus:bg-red-500"
            onClick={() => {
              clearCart();
            }}
          >
            Clear cart
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              navigate('/home'); // Go back to the previous page
            }}
          >
            Continue shopping
          </button>
        </div>
      </div>
    ) : (
      <h1 className="text-lg font-bold">Your cart is empty</h1>
    )}
  </div>
  
  {/* Map Container */}
  <div className="flex flex-col flex-1 p-4">
    <h1 className="text-xl font-bold">Map</h1>
    <p>Selected Location: {selectedLocation.name}</p>
    <button onClick={toggleMap} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
      {showMap ? "Hide Map" : "Show Map"}
    </button>
    {showMap && <MapComponent handleLocationChange={handleLocationChange} isLoaded={isLoaded} loadError={loadError} />}
  </div>

  {/* Checkout Container */}
  <div className="flex flex-col flex-1 p-4">
    <div className="checkout-container">
      <h2 className="text-lg font-bold">Checkout</h2>
      <p>Total: ${getCartTotal()}</p>
      <button onClick={makePayment} className="checkout-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        Checkout
      </button>
    </div>
  </div>
</div>

  );
};

export default Cart;
