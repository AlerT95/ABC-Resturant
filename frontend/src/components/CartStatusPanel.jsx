import { useState, useEffect } from "react";
import { useContext } from "react";
import { UniversalContext } from "../context/UniversalContext";
import { useNavigate } from "react-router-dom";

const CartStatusPanel = () => {
  const { getValue } = useContext(UniversalContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const bill = JSON.parse(localStorage.getItem("bill"));
    if (bill) {
      setSubTotal(bill.subTotal);
      setDiscount(bill.discount);
      setTotal(bill.total);
    }
  }, [getValue("bill")]);

  const handleCheckout = () => {
    navigate("/dashboard/checkout", { replace: true });
  };

  return (
    <div className="col-xl-12 mt-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <p>Sub Total:</p>
              <p>Discount:</p>
              <p>Total:</p>
            </div>
            <div className="col-6 text-end">
              <p>RS {subTotal.toFixed(2)}</p>
              <p>RS {discount === 0 ? 0 : discount.toFixed(2)}</p>
              <p>RS {total.toFixed(2)}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button className="btn btn-outline-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStatusPanel;