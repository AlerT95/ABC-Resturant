import { useState, useEffect,useContext } from 'react';
import { getAllOrders, updateOrder } from '../../api/orderApi';
import { UniversalContext } from "../../context/UniversalContext";
import { useNavigate } from "react-router-dom";

const DashboardBillingHistory = () => {
  const navigate = useNavigate();
  const { setValue,getValue } = useContext(UniversalContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userType = getValue('userType');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { ok, orders: fetchedOrders } = await getAllOrders();
        if (ok) {
          if (userType !== 'admin') {
            const user = JSON.parse(localStorage.getItem('user'));
            const filteredOrders = fetchedOrders.filter(order => order.userId === user.id);
            setOrders(filteredOrders);
          } else {
            setOrders(fetchedOrders);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleInvoiceClick = (orderId) => {
    localStorage.setItem('invoiceOrderId', orderId);
    navigate('/dashboard/invoice');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderToUpdate = orders.find((order) => order.id === orderId);
      const updatedOrder = { ...orderToUpdate, status: newStatus };
      const { ok, order } = await updateOrder(orderId, updatedOrder);
      if (ok) {
        const updatedOrders = orders.map((existingOrder) => {
          if (existingOrder.id === orderId) {
            return order; // Use the updated order object from the backend
          }
          return existingOrder;
        });
        setOrders(updatedOrders);
        setValue("AlertType", "primary");
        setValue("AlertMessage", "Order Status Changed!");
        setValue("AlertVisibility", true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-xl-12 mt-2">
      <div className="card">
        <div className="card-header">
          <h4 className="header-title">Billing History</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive-sm">
            <table className="table table-stripped table-centered mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Order Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>RS {order.totalAmount.toFixed(2)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.orderType}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-primary dropdown-toggle show"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          {order.status}
                        </button>
                        {userType === 'admin' && (
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleStatusChange(order.id, 'Pending')}
            >
              Pending
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleStatusChange(order.id, 'Processing')}
            >
              Processing
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleStatusChange(order.id, 'Canceled')}
            >
              Canceled
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleStatusChange(order.id, 'Done')}
            >
              Done
            </button>
          </li>
        </ul>
      )}
                      </div>
                    </td>
                    <td>
                      <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleInvoiceClick(order.id)}
                      >Invoice</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBillingHistory;