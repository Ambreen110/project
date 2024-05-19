import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { CartContext } from "../../context/CartContext";
import Cart from "../../pages/Cart/CartPage";
import { CiShop } from "react-icons/ci";
import { useInputContext } from "../../context/InputContext";
import "./Navbar.css";

export const Navbar = () => {
  const { cartItems, removeItem } = useContext(CartContext);
  const [showModal, setshowModal] = useState(false);
  const { inputValue, handleInputChange, searchResults, searchAPI } =
  useInputContext();


  const toggle = () => {
    setshowModal(!showModal);
  };

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    handleInputChange(newValue);
    searchAPI();
  };

  return (
   <div className="navbarrr">
      <div>
        <svg width="250" height="80" xmlns="http://www.w3.org/2000/svg">
          {/* Define linear gradient */}
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#30CFD0" />
              <stop offset="100%" stopColor="#330867" />
            </linearGradient>
          </defs>
          {/* Render text with gradient fill */}
          <text
            x="10"
            y="50"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="20"
            fontWeight={800}
            fill="url(#textGradient)"
          >
            SUPPLY-SPRINTER
          </text>
        </svg>
      </div>
      <div
        className="search-bar"
        style={{
          width: "40%",
          margin: "0px",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={handleSearchChange}
        />
        {/* <button type="button" className="search-icon">
        <i className="fas fa-search"></i> 
      </button> */}
      </div>
      <div className="links">
        <Link to="/">Login</Link>
        {/* <Link to="/home">Home</Link> */}
        <div onClick={toggle} style={{display:"flex",marginLeft:"10px"}}>
          <ShoppingCart size={24} />
          Cart ({cartItems.length})
        </div>
        <Cart showModal={showModal} toggle={toggle}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <p className="text-white">{item.name}</p>
              <button
                className="ml-2 text-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </Cart>
        <div style={{display:"flex",marginLeft:"10px"}}> 
          {" "}
          <CiShop style={{ height: "24px", width: "24px" }} />
          Become a seller
        </div>
      </div>
      {/* <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <i className="bx bx-search"></i>
    </div> */}
    </div>
  );
};
