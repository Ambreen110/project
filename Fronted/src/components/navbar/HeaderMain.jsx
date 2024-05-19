import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import logo from "../../../public/logo.png";

function HeaderMain() {
  const { cart } = useContext(CartContext);

  return (
    <section className="header-main border-b bg-white">
      <div className="container-fluid">
        <div className="row p-2 pt-3 pb-3 items-center">
          <div className="col-md-2 flex">
            <img
              className="d-none md:flex align-self-center mr-2 w-10 h-10"
              src={logo}
              alt="Logo"
            />
            <p className="align-self-center m-0">Supply Sprinter</p>
          </div>
          
          <div className="col-md-2">
            <Link
              to="/cart"
              className="flex items-center text-decoration-none"
            >
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderMain;
