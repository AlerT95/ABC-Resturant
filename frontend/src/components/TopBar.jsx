/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";
import userAvatar from "../assets/images/logo-dark.png";
import logoSm from "../assets/images/logo-sm.png";
import { useState, useEffect, useContext } from 'react';
import config from "../utils/config.json";
import { UniversalContext } from '../context/UniversalContext';
const apiUrl = config.API_URL;
const Topbar = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [searchText, setSearchText] = useState('');
  const { getValue, setValue } = useContext(UniversalContext);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfilePicture(apiUrl + profile.profilePicture);
      setfirstName(profile.firstName)
    }
  }, [getValue("profile")]);

  const handleLogout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const products = getValue('static-products');
    const services = getValue('static-services');
    const offers = getValue('static-offers');

    if (text.trim() === '') {
      setValue('products', products);
      setValue('services', services);
      setValue('offers', offers);
    } else {
      const filterProducts = products.filter((product) => {
        return product.productName.toLowerCase().includes(text.toLowerCase());
      });
      const filterServices = services.filter((service) => {
        return service.serviceName.toLowerCase().includes(text.toLowerCase());
      });
      const filterOffers = offers.filter((offer) => {
        return offer.offerName.toLowerCase().includes(text.toLowerCase());
      });

      setValue('products', filterProducts);
      setValue('services', filterServices);
      setValue('offers', filterOffers);
    }
  };

  return (
    <div className="navbar-custom" style={{ backgroundColor: '#272e03' }}>
      <div className="topbar container-fluid">
        <div className="d-flex align-items-center gap-1">
          {/* Topbar Brand Logo */}
          <div className="logo-topbar">
            {/* Logo light */}
            <Link to="/" className="logo-light">
              <span className="logo-lg">
                <img src={logo} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={logoSm} alt="small logo" />
              </span>
            </Link>

            {/* Logo Dark */}
            <Link to="/" className="logo-dark">
              <span className="logo-lg">
                <img src={logoDark} alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src={logoSm} alt="small logo" />
              </span>
            </Link>
          </div>

          {/* Sidebar Menu Toggle Button */}
          <button className="button-toggle-menu">
            <i className="ri-menu-line"></i>
          </button>

          {/* Horizontal Menu Toggle Button */}
          <button
            className="navbar-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#topnav-menu-content"
          >
            <div className="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Topbar Search Form */}
          <div className="app-search d-none d-lg-block">
            <form>
              <div className="input-group">
                <span className="ri-search-line search-icon text-muted"></span>
              </div>
            </form>
          </div>
        </div>

        <ul className="topbar-menu d-flex align-items-center gap-3">
          <Link to="/dashboard/cart">
            <li className="d-none d-sm-inline-block">
              <div className="nav-link" id="cart-icon">
                <i className="ri-shopping-cart-line fs-22"></i>
              </div>
            </li>
          </Link>

          <li className="dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle arrow-none nav-user"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <span className="account-user-avatar">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="user-image"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                    className="avatar-lg rounded-circle"
                  />
                ) : (
                  <img
                    src={userAvatar}
                    alt="user-image"
                    width="32"
                    className="rounded-circle"
                  />
                )}
              </span>
              <span className="d-lg-block d-none">
                <h5 className="my-0 fw-normal">
                  {firstName}{" "}
                  <i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle"></i>
                </h5>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
              {/* item */}
              <div className=" dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome !</h6>
              </div>

              {/* item */}
              <Link to="profile" className="dropdown-item">
                <i className="ri-account-circle-line fs-18 align-middle me-1"></i>
                <span>My Account</span>
              </Link>
              {/* item */}
              <button onClick={handleLogout} className="dropdown-item">
                <i className="ri-logout-box-line fs-18 align-middle me-1"></i>
                <span>Logout</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;