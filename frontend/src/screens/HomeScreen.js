import React,{ useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../App.css'
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const [genreSearch, setGenreSearch] = useState("/all");
  const [storeSearch, setStoreSearch] = useState("/all");


    useEffect(() => {
    
      const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        console.log('/api/products/search'+ genreSearch + storeSearch);
        let result = await axios.get('/api/products/search'+ genreSearch + storeSearch);
        
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };

     fetchData();
   },[genreSearch , storeSearch]);


  const genre = (e) => {
    if(e != null)
      setGenreSearch('/'+ e);
    else
      setGenreSearch("")
    
    console.log("genre: " + genreSearch);

  }

  const store = (e) => {
    if (e != null)
      setStoreSearch("/" + e);
    else
      setStoreSearch("");
    console.log("store: "+storeSearch);
  }
 
  return (
    <div>
      <Helmet>
        <title>Amazon best seller</title>
      </Helmet>
      <h1>Our Books</h1>
        <label for="genre">Genre: </label>
        <select name="genre" id="genre" onChange={(event) => {genre(event.target.value);}}>
          <option value="all">all</option>
          <option value="fantasy">Fantasy</option>
          <option value="romantic">Romantic</option>
          <option value="action">Action</option>
      </select>
      
        <label for="store">Store: </label>
        <select name="store" id="store" onChange={(event) => {store(event.target.value);}}>
          <option value="all">all</option>
          <option value="stimatsky">Stimatsky</option>
          <option value="amazon">Amazon</option>
          <option value="zomet sfarim">Zomet Sfarim</option>
        </select>

      {/* <h4>Search:</h4>
      <input type="search" placeholder="name..." onChange={(event) => {genre(event.target.value);}}/>
      <br /> */}
      <br />
      <br />

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.name} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
