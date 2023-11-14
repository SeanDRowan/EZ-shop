import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import '../ProductList/style.css';
import {BsFillArrowRightSquareFill} from 'react-icons/bs';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const [search, setSearch] = useState('');

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  const filterProducts = () => {
    if (!currentCategory) {
      return state.products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return state.products
      .filter((product) => product.category._id === currentCategory)
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
  };

  return (
    <div className="my-2" style={{paddingLeft: '20px'}}>
    <div style={{ marginBottom: '20px'}}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Search for Products</h2>
      <input
        type="text"
        placeholder="Search Products"
        onChange={(event) => setSearch(event.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </div>  
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Our Products:</h2>
    {filterProducts().length ? (
      <div className="flex-row">
        {filterProducts().map((product) => (
          <ProductItem
            key={product._id}
            _id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    ) : (
      <h3 style={{ textAlign: 'center' }}>No matching products found</h3>
    )}
    {loading ? <img src={spinner} alt="loading" style={{ display: 'block', margin: '20px auto' }} /> : null}
  </div>
  );
}

export default ProductList;