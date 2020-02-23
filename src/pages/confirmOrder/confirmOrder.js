import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { ShoppingCartContext } from "../../context/shoppingCart";
import { FormConfirm } from "../../components/form/form";


export const ConfirmOrder = () => {
  const apiUrl = "https://pepegashop-a294f.firebaseio.com/orders.json";
  const [, doFetch] = useFetch(apiUrl);
  const [show, setShow] = useState(false);
  const [{ cartItems, orderTotal }, setShopState] = useContext(
    ShoppingCartContext
  );

  const [form, setForm] = useState({
    City: "",
    Name: "",
    Street: "",
    Building: "",
    Zip: "",
    Phone: ""
  });
  console.log(form)

  const history = useHistory();
  const totalCount = cartItems.reduce((acc, value) => acc + value.count, 0);

  const handleClose = () => {
    setShow(false);
    history.push("/");
  };

  const confirmHandler = event => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    doFetch({
      method: "post",
      data: {
        address: form,
        order: cartItems
      }
    });
    setShow(true);
    setShopState(state => ({
      ...state,
      orderTotal: 0,
      cartItems: [],
      hiddenPepe: []
    }));
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        Your have: {totalCount} items {orderTotal} pepes in your shopping cart
      </div>
      <FormConfirm onSubmit={onSubmit} confirmHandler={confirmHandler} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your order is accepted</Modal.Title>
        </Modal.Header>
        <Modal.Body>It will be delivered within 3 days.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
