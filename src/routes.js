import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage";
import ShoppingCart from "./pages/shoppingCart/shoppingCart";
import Auth from "./pages/auth/auth";
import {ConfirmOrder} from './pages/confirmOrder/confirmOrder'
import { CurrentUserContext } from "./context/currentUser";

const Routes = () => {
  const [currentUser] = useContext(CurrentUserContext);
  if (currentUser.isLoggedIn === true) {
    return (
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/shoppingcart" component={ShoppingCart} />
        <Route path="/confirmOrder" component={ConfirmOrder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" component={MainPage} exact />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
