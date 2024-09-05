import { useState,useContext  } from 'react';
import { useNavigate } from "react-router-dom";
import { createOrder, createOrderItem } from '../../api/orderApi';
import { UniversalContext } from '../../context/UniversalContext';
const DashboardCheckout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const navigate = useNavigate();
  const { setValue } = useContext(UniversalContext);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState(null);

  const navigateToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleAddressChange = (event) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [event.target.id]: event.target.value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async () => {
    const bill = JSON.parse(localStorage.getItem('bill'));
    const billItems = JSON.parse(localStorage.getItem('billItems'));
    const user = JSON.parse(localStorage.getItem('user'));

    const orderData = {
      totalAmount: bill.total,
      subTotal: bill.subTotal,
      discount: bill.discount,
      status: 'Pending',
      paymentMethod: paymentMethod,
      orderType: deliveryMethod === 'dineIn' ? 'Dine-in' : 'Delivery',
      deliveryAddress: deliveryMethod === 'delivery' ? `${address.street}, ${address.city}, ${address.state}, ${address.zip}` : null,
      userId: user ? user.id : null,
    };

    try {
      const { ok, id: orderId } = await createOrder(orderData);
       
      if (ok) {
        for (const item of billItems) {
          const orderItemData = {
            quantity: item.qty,
            unitPrice: item.unitPrice,
            totalAmount: item.total,
            orderId,
            productId: item.itemType === 'Products' ? item.itemId : null,
            serviceId: item.itemType === 'Services' ? item.itemId : null,
            offerId: item.itemType === 'Offers' ? item.itemId : null,
          };

          await createOrderItem(orderItemData);
        }

        // Clear cart and bill data from localStorage
        localStorage.removeItem('cartProducts');
        localStorage.removeItem('cartServices');
        localStorage.removeItem('cartOffers');
        localStorage.removeItem('billItems');
        localStorage.removeItem('bill');

        // Redirect or display a success message
        console.log('Order created successfully!');
        setValue("AlertType", "primary");
        setValue("AlertMessage", "Order created successfully!");
        setValue("AlertVisibility", true);
        navigateToDashboard();
      } else {
        // Handle error
        console.error('Failed to create order');
        setValue("AlertType", "danger");
        setValue("AlertMessage", "Failed to create order!");
        setValue("AlertVisibility", true);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="col-lg-12 mt-2">
      <div className="card">
        <div className="card-header">
          <h4 className="header-title">Checkout</h4>
        </div>
        <div className="card-body">
          <div>
            <div className="mb-3">
              <label className="form-label">Delivery Method</label>
              <div className="btn-group d-flex justify-content-center">
                <button
                  className={`btn ${deliveryMethod === 'dineIn' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  style={{ borderRadius: 0 }}
                  onClick={() => handleDeliveryMethodChange('dineIn')}
                >
                  <i className="ri-restaurant-fill"></i> Dine In
                </button>
                <button
                  className={`btn ${deliveryMethod === 'delivery' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  style={{ borderRadius: 0 }}
                  onClick={() => handleDeliveryMethodChange('delivery')}
                >
                  <i className="bi bi-truck"></i> Delivery
                </button>
              </div>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="mb-3">
                <label className="form-label">Address</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="street"
                      placeholder="Street"
                      value={address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="city"
                      placeholder="City"
                      value={address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="state"
                      placeholder="State"
                      value={address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="zip"
                      placeholder="Zip"
                      value={address.zip}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <div className="btn-group d-flex justify-content-center">
                <button
                  className={`btn ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  style={{ borderRadius: 0 }}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  <i className="bi bi-credit-card"></i> Card
                </button>
                <button
                  className={`btn ${paymentMethod === 'cash' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  style={{ borderRadius: 0 }}
                  onClick={() => handlePaymentMethodChange('cash')}
                >
                  <i className="bi bi-cash"></i> Cash
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCheckout;