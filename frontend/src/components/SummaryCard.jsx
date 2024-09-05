import { useState, useContext, useEffect } from 'react';
import { UniversalContext } from '../context/UniversalContext';

const SummaryCard = () => {
  const { getValue } = useContext(UniversalContext);
  const [products, setProducts] = useState(0);
  const [services, setServices] = useState(0);
  const [offers, setOffers] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const productsData = getValue("products");
      const servicesData = getValue("services");
      const offersData = getValue("offers");
      const ordersData = getValue("orders");

      if (productsData) {
        setProducts(productsData.length);
      }
      if (servicesData) {
        setServices(servicesData.length);
      }
      if (offersData) {
        setOffers(offersData.length);
      }
      if (ordersData) {
        setOrders(ordersData.length);
      }
    };
    fetchData();
  }, [getValue]);

  const cardStyle = {
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    padding: '20px',
    transition: 'transform 0.3s ease-in-out',
  };


  const iconStyle = {
    fontSize: '40px',
    opacity: 0.8,
  };

  const titleStyle = {
    fontSize: '16px',
    letterSpacing: '1px',
    marginBottom: '10px',
  };

  const valueStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  const bgGradientPink = {
    background: 'linear-gradient(135deg, #ff7eb9, #ff758c)',
  };

  const bgGradientPurple = {
    background: 'linear-gradient(135deg, #9b5de5, #6a4c93)',
  };

  const bgGradientInfo = {
    background: 'linear-gradient(135deg, #4bb5f0, #4fc3f7)',
  };

  const bgGradientPrimary = {
    background: 'linear-gradient(135deg, #5e72e4, #825ee4)',
  };

  return (
    <div className="row g-4">
      <div className="col-xxl-3 col-sm-6">
        <div
          className="card widget-flat"
          style={{ ...cardStyle, ...bgGradientPink }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body">
            <div className="float-end">
              <i className="ri-eye-line" style={iconStyle} />
            </div>
            <h6 className="text-uppercase" style={titleStyle} title="Total Products">
              Total Products
            </h6>
            <h2 style={valueStyle}>{products}</h2>
          </div>
        </div>
      </div>

      <div className="col-xxl-3 col-sm-6">
        <div
          className="card widget-flat"
          style={{ ...cardStyle, ...bgGradientPurple }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body">
            <div className="float-end">
              <i className="ri-wallet-2-line" style={iconStyle} />
            </div>
            <h6 className="text-uppercase" style={titleStyle} title="Total Services">
              Total Services
            </h6>
            <h2 style={valueStyle}>{services}</h2>
          </div>
        </div>
      </div>

      <div className="col-xxl-3 col-sm-6">
        <div
          className="card widget-flat"
          style={{ ...cardStyle, ...bgGradientInfo }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body">
            <div className="float-end">
              <i className="ri-shopping-basket-line" style={iconStyle} />
            </div>
            <h6 className="text-uppercase" style={titleStyle} title="Total Offers">
              Total Offers
            </h6>
            <h2 style={valueStyle}>{offers}</h2>
          </div>
        </div>
      </div>

      <div className="col-xxl-3 col-sm-6">
        <div
          className="card widget-flat"
          style={{ ...cardStyle, ...bgGradientPrimary }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div className="card-body">
            <div className="float-end">
              <i className="ri-file-list-2-line" style={iconStyle} />
            </div>
            <h6 className="text-uppercase" style={titleStyle} title="Total Orders">
              Total Orders
            </h6>
            <h2 style={valueStyle}>{orders}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
