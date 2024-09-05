import { useState, useEffect } from "react";
import logo from "../../assets/images/logo-dark.png";
import { getOrderById, getOrderItemsByOrderId } from "../../api/orderApi";
import { getProductById } from "../../api/productApi";
import { getServiceById } from "../../api/serviceApi";
import { getOfferById } from "../../api/offerApi";
import { getFirstProfileByUserId } from "../../api/profileApi";

const DashboardInvoice = () => {
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [userName, setUserName] = useState("Hello,Customer!");

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const storedOrderId = localStorage.getItem("invoiceOrderId");
      if (storedOrderId) {
        try {
          const orderResponse = await getOrderById(storedOrderId);
          if (orderResponse.ok) {
            const order = orderResponse.order;
            const userId = order.userId;
            setInvoiceStatus(order.status);
            setOrderId(order.id);
            setDeliveryAddress(order.deliveryAddress);
            setSubTotal(order.subTotal);
            setDiscount(order.discount);
            setTotal(order.totalAmount);

            const profileResponse = await getFirstProfileByUserId(userId);
            if (profileResponse.ok) {
              const profile = profileResponse.profile;
              setUserName(`Hello, ${profile.firstName} ${profile.lastName}`);
            }

            const orderItemsResponse = await getOrderItemsByOrderId(storedOrderId);
            if (orderItemsResponse.ok) {
              const itemsWithDetails = await Promise.all(
                orderItemsResponse.orderItems.map(async (item) => {
                  let details;
                  if (item.productId) {
                    const productResponse = await getProductById(item.productId);
                    if (productResponse.ok) {
                      details = productResponse.product;
                    } else {
                      console.error("Error fetching product:", productResponse.message);
                    }
                  } else if (item.serviceId) {
                    const serviceResponse = await getServiceById(item.serviceId);
                    if (serviceResponse.ok) {
                      details = serviceResponse.service;
                    } else {
                      console.error("Error fetching service:", serviceResponse.message);
                    }
                  } else if (item.offerId) {
                    const offerResponse = await getOfferById(item.offerId);
                    if (offerResponse.ok) {
                      details = offerResponse.offer;
                    } else {
                      console.error("Error fetching offer:", offerResponse.message);
                    }
                  }
                  return { ...item, details };
                })
              );
              setItems(itemsWithDetails);
            } else {
              console.error("Error fetching order items:", orderItemsResponse.message);
            }
          } else {
            console.error("Error fetching order:", orderResponse.message);
          }
        } catch (error) {
          console.error("Error fetching invoice data:", error);
        }
      }
    };

    fetchInvoiceData();
  }, []);

  return (
    <div className="col-12 mt-2">
      <div className="card">
        <div className="card-body">
          {/* Invoice Logo*/}
          <div className="clearfix">
            <div className="float-start mb-3">
              <img src={logo} alt="dark logo" height="22" />
            </div>
            <div className="float-end">
              <h4 className="m-0 d-print-none">Invoice</h4>
            </div>
          </div>

          {/* Invoice Detail*/}
          <div className="row">
            <div className="col-sm-6">
              <div className="float-end mt-3">
                <p>
                  <b>{userName}</b>
                </p>
                <p className="text-muted fs-13">
                  Thank you for dining with us! Please find below a breakdown of
                  your order.
                </p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-4 offset-sm-2">
              <div className="mt-3 float-sm-end">
                <p className="fs-13">
                  <strong>Order Status: </strong>{" "}
                  <span className="badge bg-success float-end">
                    {invoiceStatus}
                  </span>
                </p>
                <p className="fs-13">
                  <strong>Order ID: </strong>{" "}
                  <span className="float-end">{orderId}</span>
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          {deliveryAddress && (
            <div className="row mt-4">
              <div className="col-6">
                <h6 className="fs-14">Delivery Address</h6>
                <address>{deliveryAddress}</address>
              </div>
              {/* end col*/}
            </div>
          )}
          {/* end row */}

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-sm table-centered table-borderless mb-0 mt-3">
                  <thead className="border-top border-bottom bg-light-subtle border-light">
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Unit Cost</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="">{index + 1}</td>
                        <td>
                          <b>
                            {item.details.productName ||
                              item.details.serviceName ||
                              item.details.offerName}
                          </b>{" "}
                          
                        </td>
                        <td>{item.quantity}</td>
                        <td>Rs {item.unitPrice}.00</td>
                        <td className="text-end">
                          Rs {item.unitPrice * item.quantity}.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* end table-responsive*/}
            </div>
            {/* end col */}
          </div>
          {/* end row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="clearfix pt-3">
                <h6 className="text-muted fs-14">Notes:</h6>
                <small>
                  Thank you for choosing our restaurant. We hope you enjoyed your
                  meal!
                </small>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-6">
              <div className="float-end mt-3 mt-sm-0">
                <p >
                  <b >Sub-total: </b>{" "}
                  <span className="float-end">Rs {subTotal}.00</span>
                </p>
                <p>
                  <b>Discount:</b>{" "}
                  <span className="float-end">Rs {discount}.00</span>
                </p>
                <h3>Rs {total}.00</h3>
              </div>
              <div className="clearfix"></div>
            </div>
            {/* end col */}
          </div>
          {/* end row*/}

          <div className="d-print-none mt-4">
            <div className="text-center">
              <a href="javascript:window.print()" className="btn btn-primary">
                <i className="ri-printer-line"></i> Print
              </a>
            </div>
          </div>
          {/* end buttons */}
        </div>
        {/* end card-body*/}
      </div>
      {/* end card */}
    </div>
  );
};

export default DashboardInvoice;