import React, { useContext } from "react";
import { ShoppingCartContext, updateOrder } from "../../context/shoppingCart";

export const SidebarCard = ({ response }) => {
  const [shopState, setShopState] = useContext(ShoppingCartContext);

  const addToCartHandler = () => {
    setShopState(updateOrder(shopState, 2, response, 1, 0.7));
  };

  if (!response) {
    return null;
  }

  return (
    <div
      className="card border-success mt-5 mb-3"
      style={{ maxWidth: "15rem" }}
    >
      <div className="card-header bg-transparent border-success">
        SPECIAL PRICE TODAY
      </div>
      <img
        src={response[1].img}
        className="card-img-top"
        style={{ width: "150px", height: "150px" }}
        alt="..."
      />
      <div className="card-body text-success">
        <h5 className="card-title">30% sale</h5>
        <p className="card-text">{response[1].name}</p>
        <p className="card-text">{response[1].price * 0.7} pepes</p>
      </div>
      <div className="card-footer bg-transparent border-success">
        <button onClick={addToCartHandler} className="btn btn-primary btn-sm">
          Add to cart
        </button>
      </div>
    </div>
  );
};
