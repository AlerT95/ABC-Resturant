import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logo-dark.png";

function Navbar() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-radius-lg top-0 z-index-3 shadow-none fixed-top start-0 end-0"
      style={{ backgroundColor: '#272e03' }}
    >
      <div className="container-fluid">
        <div className="auth-brand p-1" onClick={() => handleClick('/')}>
          <Link to="/" className="logo-light">
            <img src={logo} alt="logo" height="30" />
          </Link>
          <Link to="/" className="logo-dark">
            <img src={logoDark} alt="dark logo" height="30" />
          </Link>
        </div>
        <button
          className="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navigation">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <button
                onClick={() => handleClick('/products')}
                className="btn btn-outline-dark text-white  px-2 py-1 m-2"
                style={{ transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Products
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleClick('/services')}
                className="btn btn-outline-dark text-white px-2 py-1 m-2"
                style={{ transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Services
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleClick('/offers')}
                className="btn btn-outline-dark text-white  px-2 py-1 m-2"
                style={{ transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Offers
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleClick('/about-us')}
                className="btn btn-outline-dark text-white  px-2 py-1 m-2"
                style={{ transition: 'transform 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                About Us
              </button>
            </li>
          </ul>
          <ul className="navbar-nav d-lg-block d-none">
            <li className="nav-item">
              <button
                onClick={() => handleClick('/login')}
                className="btn btn-outline-dark text-white  px-2 py-1 m-2"
                style={{ transition: 'transform 0.2s' }}
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
