import React, { useState, useRef } from 'react';
 import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';  // Import gql from @apollo/client
import { Button } from 'react-bootstrap';
import { QUERY_PRODUCTS } from '../../utils/queries';
// Define your GraphQL query using gql

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  console.log('Data:', data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Nothing to see here</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const inputData = inputRef.current.value;
    console.log(inputData)
    setSearch(inputData);
    inputRef.current.value = '';
  };

  const navigateToProductDetail = (productId) => {
     //Navigate to the product detail page
    console.log('Navigating to:', productId);
    navigate(`/products/:${productId}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          placeholder="Enter Product Here"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            Search
          </Button>
        </div>
      </form>
      {data.products
        .filter((products) =>
        console.log(products.name),
          products.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((products, index) => (
          <div
            key={index}
             onClick={() => navigateToProductDetail(product._id)}
             style={{ cursor: 'pointer' }}
          >
            <p>{products.name}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchBar;
