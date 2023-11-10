import  { useState } from 'react';
import ProductList from '../ProductList/index.jsx';
// import Data from '../../../.././server/seeds';
// import { useStoreContext } from '/utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from "react-icons";

//searchbar connected to server database
//how to pull products data from config/seeds.js file


const SearchBar = () => {
    const [Search, setSearch] = useState('');

    const { loading, data } = useQuery(QUERY_PRODUCTS);
    if (loading) {
        return <div>Loading...</div>;
      }
      if (!data) {
        return <div>Nothing to see here</div>;
      }
      console.log(data.products);
    

  return (
    <div>
        <h1>Search Bar</h1>
         <IconContext.Provider value={{ color: "black", size: "1em", className: "global-class-name" }}>
           <button> 
            <BsSearch/> 
           </button>
         </IconContext.Provider>
          <input placeholder="Enter Product Here" onChange={event => setSearch(event.target.value)} />
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
