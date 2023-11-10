import React, { useState, useRef } from 'react';
// import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
// import { BsSearch } from 'react-icons/bs';
// import { IconContext } from "react-icons";
import { Button } from 'react-bootstrap';
import Detail from '../../pages/Detail';
//searchbar connected to server database
//how to pull products data from config/seeds.js file

const SearchBar = () => {
    const [Search, setSearch] = useState('');
    const inputRef = useRef();

    const { loading, data } = useQuery(QUERY_PRODUCTS);
    console.log(data);
    if (loading) {
        return <div>Loading...</div>;
      }
      if (!data) {
        return <div>Nothing to see here</div>;
      }
     
    
    const onSubmit = (e) => {
        e.preventDefault();

        const inputData = inputRef.current.value;
        console.log(inputData);
    
        
        inputRef.current.value = '';
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
          <input ref={inputRef} placeholder="Enter Product Here" onChange={event => setSearch(event.target.value)} />
          <div className="d-grid gap-2">
           <Button type="submit" variant="primary" size="lg">
             Search
           </Button>
         </div>
        </form>
           {
               data.products.filter(products => {
                if (Search === '') {
                  return '';
                } else if (products.name.toLowerCase().includes(Search.toLowerCase())) {
                  return products;
                }
              }).map((products, index) => (
                console.log(products.name),
                <div key={index}>
                    
                  <p>{products.name}</p>
                </div>
                
              ))
            }
    </div>
  );
};

export default SearchBar;