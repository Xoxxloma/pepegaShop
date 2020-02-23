import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import isLength from "validator/lib/isLength";

import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../context/currentUser";
import ErrorMessages from "../../components/errorMessages/errorMessages";

const Auth = ({ match }) => {
  const isLogin = match.path === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const apiUrl = isLogin
    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDepGCrBj1iY71FCakoanhjSfhfZzp6pX4"
    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDepGCrBj1iY71FCakoanhjSfhfZzp6pX4";

  const backendError = "email or password invalid, check it and try again";
  const validError = "password must be between 6 and 18 characters";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [, dispatch] = useContext(CurrentUserContext);
  const valid = isLength(password, { min: 6, max: 18 });
  const touched = password.length >= 1;

  const handleSubmit = e => {
    e.preventDefault();

    doFetch({
      method: "post",
      data: {
        email: email,
        password: password,
        returnSecureToken: true
      }
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    localStorage.setItem('token', response.idToken);
    setIsSuccessfullSubmit(true);
    dispatch({
      type: "SET_AUTHORIZED",
      payload: response.idToken
    });
  }, [response, dispatch]);

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="col-md-6 offset-md-3 col-xs-12 ">
            <h1 className="text-center pt-3">{pageTitle}</h1>
            {error && <ErrorMessages text={backendError} />}
            {!valid && touched && <ErrorMessages text={validError} />}
            <form onSubmit={handleSubmit}>
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-lg btn-success  mr-3" type="submit">
                  {pageTitle}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
