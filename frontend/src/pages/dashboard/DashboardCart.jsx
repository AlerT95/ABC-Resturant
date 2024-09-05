/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { UniversalContext } from "../../context/UniversalContext";
import CartStatusPanel from "../../components/CartStatusPanel";

const DashboardCart = () => {
  const { getValue, setValue } = useContext(UniversalContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCartItems = () => {
      const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
      const cartServices = JSON.parse(localStorage.getItem("cartServices")) || [];
      const cartOffers = JSON.parse(localStorage.getItem("cartOffers")) || [];

      const allCartItems = [...cartProducts, ...cartServices, ...cartOffers];

      const processedCartItems = allCartItems.map((item) => {
        if (Object.hasOwn(item, "offerName")) {
          const products = getValue("products");
          if (products) {
            const product = products.find((p) => p.id === item.productId);
            if (product) {
              const discountedPrice = product.price - (product.price * item.discountPercentage / 100);
              return { ...item, price: discountedPrice, originalPrice: product.price };
            }
          }
        }
        return item;
      });

      setCartItems(processedCartItems);

      const billItems = processedCartItems.map((item) => {
        const subTotal = item.originalPrice?item.originalPrice*item.qty:item.price * item.qty;
        let discount = 0;
        if (Object.hasOwn(item, "offerName") && item.originalPrice) {
          discount = (item.originalPrice - item.price) * item.qty;
        }
        const total = subTotal - discount;
        return {
          itemType: getItemType(item),
          itemId: item.id,
          itemName: item.productName || item.serviceName || item.offerName,
          unitPrice: item.price,
          qty: item.qty,
          subTotal,
          discount,
          total,
        };
      });

      localStorage.setItem("billItems", JSON.stringify(billItems));

      const subTotal = billItems.reduce((sum, item) => sum + item.subTotal, 0);
      const discount = billItems.reduce((sum, item) => sum + item.discount, 0);
      const total = subTotal - discount;
      const bill = { subTotal, discount, total };
      localStorage.setItem("bill", JSON.stringify(bill));
      console.log(bill);
      console.log(billItems);
    };

    updateCartItems(); // Initial fetch
  }, [getValue, setValue]);

  const handleQuantityChange = (index, change) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].qty = Math.max(1, updatedCartItems[index].qty + change);

    const itemType = getItemType(updatedCartItems[index]);
    const cartKey = `cart${itemType}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems.filter((item) => getItemType(item) === itemType)));
    setValue(cartKey, updatedCartItems.filter((item) => getItemType(item) === itemType));

    updateBillItemsAndBill(updatedCartItems);
  };

  const handleDelete = (index) => {
    const updatedCartItems = [...cartItems];
    const deletedItem = updatedCartItems.splice(index, 1)[0];

    const itemType = getItemType(deletedItem);
    const cartKey = `cart${itemType}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems.filter((item) => getItemType(item) === itemType)));
    setValue(cartKey, updatedCartItems.filter((item) => getItemType(item) === itemType));

    updateBillItemsAndBill(updatedCartItems);
  };

  const updateBillItemsAndBill = (cartItems) => {
    const billItems = cartItems.map((item) => {
      const subTotal = item.originalPrice?item.originalPrice*item.qty:item.price * item.qty;
      let discount = 0;
      if (Object.hasOwn(item, "offerName") && item.originalPrice) {
        discount = (item.originalPrice - item.price) * item.qty;
      }
      const total = subTotal - discount;
      return {
        itemType: getItemType(item),
        itemId: item.id,
        itemName: item.productName || item.serviceName || item.offerName,
        unitPrice: item.price,
        qty: item.qty,
        subTotal,
        discount,
        total,
      };
    });
    localStorage.setItem("billItems", JSON.stringify(billItems));

    const subTotal = billItems.reduce((sum, item) => sum + item.subTotal, 0);
    const discount = billItems.reduce((sum, item) => sum + item.discount, 0);
    const total = billItems.reduce((sum, item) => sum + item.total, 0);
    const bill = { subTotal, discount, total };
    localStorage.setItem("bill", JSON.stringify(bill));
    setValue("bill", bill);
  };

  const getItemType = (item) => {
    if (Object.hasOwn(item, "productName")) return "Products";
    if (Object.hasOwn(item, "serviceName")) return "Services";
    if (Object.hasOwn(item, "offerName")) return "Offers";
    return "Unknown"; // Handle cases where item type is not clear
  };

  return (
    <>
      <CartStatusPanel />
      <div className="col-xl-12 mt-2">
        <div className="card">
          <div className="card-header">
            <h4 className="header-title">Manage Cart</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive-sm">
              <table className="table table-hover table-centered mb-0">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th className="d-flex justify-content-center">Quantity</th>
                    <th>Discount</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName || item.serviceName || item.offerName}</td>
                      {/* Display original price with strikethrough for offers */}
                      <td>
                        {Object.hasOwn(item, "offerName") && item.originalPrice ? (
                          <>
                            <span style={{ textDecoration: "line-through" }}>{`RS ${item.originalPrice.toFixed(2)}`}</span>
                            <br />
                            {`RS ${item.price.toFixed(2)}`}
                          </>
                        ) : item.price !== undefined ? (
                          `RS ${item.price.toFixed(2)}`
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleQuantityChange(index, 1)}
                          >
                            <i className="ri-arrow-up-circle-line fs-4"></i>
                          </button>
                          <span className="badge badge-outline-primary p-2">{item.qty}</span>
                          <button
                            className="btn btn-sm btn-primary ms-2"
                            onClick={() => handleQuantityChange(index, -1)}
                          >
                            <i className="ri-arrow-down-circle-line fs-4"></i>
                          </button>
                        </div>
                      </td>
                      <td>{item.discountPercentage ? `${item.discountPercentage}%` : "-"}</td>
                      {/* Calculate amount based on discounted price for offers */}
                      <td>
                        {item.price !== undefined ? `RS ${(item.price * item.qty).toFixed(2)}` : "-"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="ri-delete-bin-2-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCart;