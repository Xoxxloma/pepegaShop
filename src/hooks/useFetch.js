import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { ShoppingCartContext } from "../context/shoppingCart";

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [, setShopState] = useContext(ShoppingCartContext);

  const doFetch = useCallback((options = {}) => {
    setIsLoading(true);
    setOptions(options);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    axios(url, options)
      .then(res => {
        setIsLoading(false);
        setResponse(res.data);
        setShopState(state => ({
          ...state,
          hiddenPepe: res.data
        }));
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.response.data);
      });
  }, [isLoading, options, url, setShopState]);

  return [{ response, isLoading, error }, doFetch];
};

export default useFetch;
