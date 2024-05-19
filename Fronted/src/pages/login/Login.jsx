import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import style from "./Login.module.css";
import { LocationContext } from "../../context/LocationContext.jsx";
import { ProductsContext } from "../../context/ProductsContext.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { TbMessages } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Login = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { setLocation } = useContext(LocationContext);
  const { setProducts, setNearbyStores, setSearch_information } =
    useContext(ProductsContext);

  const [hasValidLocation, setHasValidLocation] = useState(false);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBDpSrNoVvQibtAX-fCl4RSqmrHvhxbpy0&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initializeAutocomplete;
      document.body.appendChild(googleMapsScript);
    };

    if (!window.google || !window.google.maps) {
      loadGoogleMapsScript();
    } else {
      initializeAutocomplete();
    }
  }, []);

  const extractZipFromAddress = (addressComponents) => {
    console.log("hey hello", addressComponents);
    for (const component of addressComponents) {
      if (component.types.includes("postal_code")) {
        return component.long_name;
      }
    }
    return null;
  };
  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["address_components", "formatted_address", "geometry"],
        restrictions: {
          country: ["us", "ca"],
        },
        maxVisibleItems: 10,
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.error("No location data found for this place.");
        return;
      }
      const address = place.formatted_address;
      setQuery(address);
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();

      const addressComponents = place.address_components;
      const zipCode = extractZipFromAddress(addressComponents);

      if (!zipCode) {
        toast.error("Failed to extract ZIP code from the provided address.");
        return;
      }

      const newLocationData = {
        latitude,
        longitude,
        address: place.formatted_address,
        country: place.address_components.find((component) =>
          component.types.includes("country")
        )?.long_name,
        delivery_zip: zipCode,
      };

      setLocationData(newLocationData);
      setHasValidLocation(true);
    });
  };

  function handleNavigate(e) {
    e.preventDefault();
    if (!hasValidLocation) {
      toast.error(
        "Please select a valid location in the United States or Canada."
      );
      return;
    }

    fetch("http://localhost:5000/api/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: locationData,
        delivery_zip: locationData.delivery_zip,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to send location data to the backend.");
        }
      })
      .then((data) => {
        setProducts(data.products);
        setLocation(locationData);
        setNearbyStores(data.nearby_stores);
        setSearch_information(data.search_information);

        console.log("====================================");
        console.log(data.search_information);
        console.log("====================================");

        navigate(`/home`);
      })
      .catch((error) => {
        console.error("Error sending location data:", error);
        toast.error("Failed to send location data to the backend.");
      });
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={style.login_container}>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className={`${style.login_header} `}>
        <div>
          <svg width="400" height="80" xmlns="http://www.w3.org/2000/svg">
            {/* Define linear gradient */}
            <defs>
              <linearGradient
                id="textGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#30CFD0" />
                <stop offset="100%" stopColor="#330867" />
              </linearGradient>
            </defs>
            {/* Render text with gradient fill */}
            <text
              x="10"
              y="60"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="30"
              fontWeight={800}
              fill="url(#textGradient)"
            >
              SUPPLY-SPRINTER
            </text>
          </svg>
        </div>
        <div className={style.login_header_left_content}>
          <div>
            <TbMessages style={{ width: "24px", height: "24px" }} />
          </div>
          <div style={{ marginLeft: "5px" }}>
            <div style={{ fontSize: "12px" }}>Need for help contact us</div>
            <div style={{ fontSize: "12px" }}>+1(699)600-4444</div>
          </div>
        </div>
      </div>
      <div className={`${style.login_main_container}`}>
        <div className={style.login_main_container_left}>
          <div>
            <h1 className={style.heading}>
              Your Reliable Construction Partner
            </h1>
            <h2 className={style.tagline}>Your Foundation Starts Here.</h2>

            <form className="form-inline" onSubmit={handleNavigate}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ backgroundColor: "white", border: "none" }}
                  >
                    <CiDeliveryTruck />
                  </span>
                </div>
                <input
                  // className="form-control mr-sm-2"
                  ref={inputRef}
                  type="search"
                  placeholder="Enter your Location"
                  aria-label="Search"
                  style={{ width: "350px", height: "50px", border: "none" }}
                  value={query}
                  onChange={handleInputChange}
                  className={style.input_foucus}
                />
              </div>

              <button
                className={` ${style.login_button}`}
                type="submit"
                disabled={!hasValidLocation}
              >
                <CiSearch
                  style={{
                    color: "white",
                    width: "24px",
                    height: "24px",
                    margin: "0px",
                  }}
                />{" "}
              </button>
            </form>
          </div>
        </div>
        <div className={` ${style.right_section}`}>
          {/* Content for the right section, if any */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
