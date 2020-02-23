import React from "react";
import Navbar from "./components/navbar/navbar";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./context/currentUser";
import CurrentUserChecker from "./components/currentUserChecker/currentUserChecker";
import { ShoppingCartProvider } from "./context/shoppingCart";


const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
          <ShoppingCartProvider>
            <BrowserRouter>
              <Navbar />
              <Routes />
            </BrowserRouter>
          </ShoppingCartProvider>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
