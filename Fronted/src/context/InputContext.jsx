import React, { createContext, useState, useContext } from "react";
import axios from "axios";
// import { createContext, useContext, useState } from "react";

import { ProductsContext } from "./ProductsContext";

// Create the context
const InputContext = createContext();

// Create a provider component
export const InputProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("chair");
  const [searchResults, setSearchResults] = useState([]);
  const {
    setProducts,
    setNearbyStores,
    setSearch_information,
    search_information,
  } = useContext(ProductsContext);

  const handleInputChange = (newValue) => {
    console.log("sea", searchResults);
    setInputValue(newValue);
  };
  const searchAPI = async () => {
    try {
      const response = await axios.post("http://localhost:5000//api/search", {
        inputValue: inputValue,
        delivery_zip: search_information.delivery_zip,
        store_id: search_information.store_id,
      });

      const data = response.data;
      setProducts(data.products);
      // setNearbyStores(data.nearby_stores);
      // setSearch_information(data.search_information);

      console.log("API response:", data);
    } catch (error) {
      console.error("Error sending location data:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <InputContext.Provider
      value={{ inputValue, handleInputChange, searchResults, searchAPI }}
    >
      {children}
    </InputContext.Provider>
  );
};

// Custom hook to consume the input context
export const useInputContext = () => {
  return useContext(InputContext);
};
