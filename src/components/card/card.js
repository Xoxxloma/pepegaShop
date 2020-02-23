import React, { useContext } from "react";
import { ShoppingCartContext, updateOrder } from "../../context/shoppingCart";
import { saleRatio, changeRatio } from "../../utils";


const Card = ({ name, img, price, id }) => {
  const [shopState, setShopState] = useContext(ShoppingCartContext);
  const { hiddenPepe } = shopState;
  const ratio = changeRatio(id);

  const addToCartHandler = () => {
    setShopState(updateOrder(shopState, id, hiddenPepe, 1, ratio));
  };

  if (!hiddenPepe) {
    return null;
  }

  return (
    <>
      {ratio === saleRatio ? (
        <div
          className="card mt-5 mr-3 border-success pepoCardSale .d-inline-flex"
          style={{ width: "15rem" }}
        >
          <img
            src={img}
            className="card-img-top pl-3, pt-3"
            style={{ width: "150px", height: "150px" }}
            alt="..."
          />
          <div className="card-body text-success">
            <h5 className="card-title">SALE! {name}</h5>
            <p className="card-text">Just {price * ratio} pepes</p>
            <button
              onClick={addToCartHandler}
              className="btn btn-primary btn-sm"
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div
          className="card mt-5 mr-3 pepoCardOrdinary .d-inline-flex"
          style={{ width: "15rem" }}
        >
          <img
            src={img}
            className="card-img-top p-3"
            style={{ width: "150px", height: "150px" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Cost: {price * ratio} pepes</p>
            <button
              onClick={addToCartHandler}
              className="btn btn-primary btn-sm"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
