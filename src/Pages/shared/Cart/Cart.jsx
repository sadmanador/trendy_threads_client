import React, { useContext } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { deleteShoppingCart } from "../../../utilities/fakedb";
import { CartContext } from "../../../contexts/DataContext/DataContext";

const Cart = ({ cart, children }) => {
  const { setCart, grandTotal, setGrandTotal } = useContext(CartContext);
  let quantity = 0;
  let total = 0;
  let shipping = 0;
  let tax = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
    tax = (total * 0.1).toFixed(2);
  }
  const subtotal = shipping + total + parseFloat(tax);
  setGrandTotal(subtotal.toFixed(2))

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="m-6">
      <div>
        <h1 className="font-bold lg:text-2xl text-xl text-center border-b-2 mb-4 pb-2 border-black">
          Order Summary
        </h1>
        <div className="text-end relative">
          {" "}
          <BsFillCartFill className="inline text-5xl" />
          <span className="badge badge-success absolute right-0 top-1 rounded-full">
            {quantity}
          </span>
        </div>
        <div className="ml-6 text-md lg:text-2xl font-semibold my-5 py-5">
          <p>Total: ${total}</p>
          <p>Shipping: ${shipping}</p>
          <p>Tax: ${tax}</p>
        </div>
        <p className="text-lg lg:text-xl font-semibold ml-4 mt-6">
          <span className="font-bold">Grand Total:</span> $
          {grandTotal}
        </p>
      </div>
      <div className="text-center mt-8">
        {cart.length !== 0 ? (
          <button
            className="btn btn-outline hover:bg-orange-400 hover:border-none text-lg font-bold"
            onClick={clearCart}
          >
            Clear Cart <AiOutlineClear className="text-2xl" />
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="text-center mt-3">
        {cart.length !== 0 && children}
      </div>
    </div>
  );
};

export default Cart;
