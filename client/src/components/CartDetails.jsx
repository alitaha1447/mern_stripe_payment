import React, { useEffect, useState } from "react";
import "./cartStyle.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
} from "../redux/features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
  };

  const handleRemove = (e) => {
    dispatch(removeToCart(e));
  };

  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e));
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setPrice(totalprice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  const makePayment = async () => {
    setLoading(true); // Start loading
    try {
      const stripe = await loadStripe(
        "pk_test_51OwN4hSHLsSvU0ECffwwh5i4poBjDNSKyDvXu66ZV0WkxUqHVcCfsp2FXJ1sGjZw9ZtPnHzFg7CeGcbSfjZPvGiR00gYCVdSVA"
      );

      const body = {
        products: carts,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log("result -- ", result);
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false); // End loading
  };

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 ">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button className="btn btn-danger mt-0 btn-sm">
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>EmptyCart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <>
                  <table className="table cart-table mb-0 table-responsive-sm">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th className="text-right">
                          <span id="amount" className="amount">
                            Total Amount
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <button
                                className="prdct-delete"
                                onClick={() => handleRemove(data.id)}>
                                <i className="fa fa-trash-alt mr-2"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt="" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>{data.price}</td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDecrement(data.id)
                                      : () => handleSingleDecrement(data)
                                  }>
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                />
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={() => handleIncrement(data)}>
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              ₹ {data.qnty * data.price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={2}>&nbsp;</th>
                        <th>
                          Items In Cart <span className="ml-2 mr-2">:</span>
                          <span className="text-danger">{totalquantity}</span>
                        </th>
                        <th className="text-right">
                          Total Price<span className="ml-2 mr-2">:</span>
                          <span className="text-danger">₹ {totalprice}</span>
                        </th>
                        <th className="text-right">
                          <button
                            className="btn btn-success"
                            onClick={makePayment}
                            type="button"
                            disabled={loading}>
                            {loading ? "Processing..." : "Checkout"}{" "}
                          </button>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
