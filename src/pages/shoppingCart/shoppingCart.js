import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext, updateOrder } from "../../context/shoppingCart";
import { changeRatio } from "../../utils";

const ShoppingCart = () => {
  const [shopState, setShopState] = useContext(ShoppingCartContext);
  const { cartItems, orderTotal, hiddenPepe } = shopState;

  console.log(cartItems);
  const onInc = id => {
    setShopState(updateOrder(shopState, id, hiddenPepe, 1, changeRatio(id)));
  };
  const onDec = id => {
    setShopState(updateOrder(shopState, id, hiddenPepe, -1, changeRatio(id)));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Your PepesOrder</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Price per one</th>
            <th scope="col">Total price</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, idx) => (
            <tr key={item.id}>
              <th scope="row">{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{Math.round(item.total)}</td>
              <td>
                <button
                  className="btn btn-outline-warning btn float-center ml-3 mr-3"
                  onClick={() => onDec(item.id)}
                >
                  <i className="fa fa-minus" />
                </button>
                <span className="itemCount">{item.count}</span>
                <button
                  className="btn btn-outline-warning btn float-center ml-3 mr-3"
                  onClick={() => onInc(item.id)}
                >
                  <i className="fa fa-plus" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-secondary float-right ml-3 mr-3"
        type="button"
        disabled={cartItems.length === 0}
      >
        {cartItems.length === 0 ? (
          <span className="nav-link">Confirm</span>
        ) : (
          <Link
            className="nav-link text-decoration-none text-reset"
            to="/confirmOrder"
          >
            Confirm
          </Link>
        )}
      </button>
      <div className="float-right mt-2">
        Your order: {Math.round(orderTotal)} pepes
      </div>
    </div>
  );
};

export default ShoppingCart;
