import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

function Header({ onDataChangeReal }) {
  const [data, setData] = useState([]);

  // Function to handle data change and pass it down to Navbar
  const handleDataChange = (newData) => {
    console.log("here also data changing");
    setData(newData);
  };

  useEffect(() => {
    onDataChangeReal(data);
  }, [data, onDataChangeReal]);

  return (
    <header className="section-header">
      <Navbar />
    </header>
  );
}

export default Header;
