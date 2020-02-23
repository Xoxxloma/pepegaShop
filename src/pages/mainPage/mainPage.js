import React, { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import _ from 'lodash';
import useFetch from "../../hooks/useFetch";
import Card from "../../components/card/card";
import { SidebarCard } from "../../components/sidebarCard/sidebarCard";
import { Loader } from "../../components/loader/loader";
import { ShoppingCartContext } from "../../context/shoppingCart";


const MainPage = () => {
  const apiUrl = "https://pepegashop-a294f.firebaseio.com/commodities.json";
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [shopState] = useContext(ShoppingCartContext)
  const [page, setPage] = useState(0)
  console.log('shopstate', shopState)
  console.log('response', response)
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const pageChanger = ({selected}) => {
    setPage(selected)
  };
  const pageSize = 6;
  const pageCount = () => response.length / pageSize
  const display = _.chunk(response, pageSize)[page]


  if (isLoading) {
    return <Loader />
  }

  if (!response) {
    return null;
  }

  return (
    <div className="container">
      {error && <div>something has gone wrongg</div>}
      {!isLoading && response && (
        <>
          <div className="row">
            <div className="col-9 row">
              {display.map(item => (
                <Card
                  name={item.name}
                  img={item.img}
                  price={item.price}
                  key={item.id}
                  id={item.id}
                />
              ))}
            </div>
            <div className="col">
              <SidebarCard response={response} />
            </div>
          </div>
          <div className="mt-3">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount()}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={pageChanger}
            containerClassName={"pagination"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName={"active"}
            classname="pagination"
          />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
