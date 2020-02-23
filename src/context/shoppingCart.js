import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext([{}, () => {}])

export const ShoppingCartProvider = ({ children }) => {

  const [state, setState] = useState({
    hiddenPepe: [],
    cartItems: [],
    orderTotal: 0
  })

  return (
    <ShoppingCartContext.Provider value={[state, setState]}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

const updateCartItems = (cartItems, item, idx) => {

  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const updateCartItem = (pepe, item = {}, quantity, saleRatio = 1) => {

  const {
    id = pepe.id,
    price = pepe.price,
    count = 0,
    name = pepe.name,
    total = 0 } = item;

  return {
    id,
    name,
    price,
    count: count + quantity,
    total: total + quantity * pepe.price * saleRatio
  };
};

export const updateOrder = (state, pepeId, hiddenPepe, quantity, saleRatio = 1) => {
  const { cartItems, orderTotal } = state;

  const pepe = hiddenPepe.find(({id}) => id === pepeId);
  const itemIndex = cartItems.findIndex(({id}) => id === pepeId);
  const item = cartItems[itemIndex];

  const newItem = updateCartItem(pepe, item, quantity, saleRatio);
  return {
    orderTotal: orderTotal + quantity * pepe.price * saleRatio,
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    hiddenPepe
  };
};