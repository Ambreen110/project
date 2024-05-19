import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-dark"
      style={{ backgroundColor: "#ECEFF1" }}
    >
      {/* Section: Social media */}
      <section
        className="d-flex justify-content-between p-4 text-white"
        style={{ backgroundColor: "#71A6B8" }}
      >
        {/* Left */}
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Right */}
        <div>
          <FaXTwitter style={{ marginRight: "10px" }} />
          <SiFacebook style={{ marginRight: "10px" }} />
          <FaInstagram style={{ marginRight: "10px" }} />
        </div>
      </section>
      {/* Section: Social media */}

      {/* Section: Links */}
      <section className="">
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold">Supply Sprinter</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                Builders' Supply Hub is your premier source for hassle-free
                construction material delivery. Founded on the principle of
                simplifying the building process, we specialize in providing
                builders and contractors with swift access to quality
                construction materials. Our curated selection of essential
                building supplies—from concrete and steel to lumber and
                hardware—is sourced from trusted suppliers, ensuring reliability
                and excellence in every delivery.
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Products</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-dark">
                  MDBootstrap
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  MDWordPress
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  BrandFlow
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Bootstrap Angular
                </a>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-dark">
                  Your Account
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Shipping Rates
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Help
                </a>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <i className="fas fa-home mr-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> info@example.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print mr-3"></i> + 01 234 567 89
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">
          Supply-Sprinter
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
