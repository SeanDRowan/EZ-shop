import React, { useState } from 'react';
import ProductItem from '../ProductItem';
import Data from '../../../.././server/seeds/products.json'

const SearchBar = () => {
    const [Search, setSearch] = useState('');
  return (
    <div>
          <input placeholder="Enter Product Here" onChange={event => setSearch(event.target.value)} />
           {
               Data.filter(products => {
                if (Search === '') {
                  console.log(ProductItem)
                  return '';
                } else if (products.name.toLowerCase().includes(Search.toLowerCase())) {
                  return products;
                }
              }).map((products, index) => (
                <div key={index}>
                  <p>{products.name}</p>
                </div>
              ))
            }
    </div>
  );
};

export default SearchBar;
