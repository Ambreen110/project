import React, { createContext, useContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({
  children,
  initialProducts = [],
  initialNearbyStores = [],
  initialSearch = [],
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [nearby_Stores, setNearbyStores] = useState(initialNearbyStores);
  const [search_information, setSearch_information] = useState(initialSearch);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        nearby_Stores,
        setNearbyStores,
        search_information,
        setSearch_information,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
