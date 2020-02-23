import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUser";

const Navbar = () => {
  const [currentUser, dispatch] = useContext(CurrentUserContext);
  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT"
    });
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={
              "https://cdn3.iconfinder.com/data/icons/popular-memes/48/JD-28-512.png"
            }
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp; Pepega
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {!currentUser.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {currentUser.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/shoppingcart" className="nav-link">
                  Shopping Cart
                </NavLink>
              </li>
              <button
                onClick={logoutHandler}
                type="button"
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
