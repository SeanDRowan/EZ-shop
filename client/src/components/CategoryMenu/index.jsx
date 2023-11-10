import React, { useEffect, useState, useRef} from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES, QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SearchBar from '../SearchBar';



function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const [selectedCategory, setSelectedCategory] = useState('');


  const { categories } = state;

  const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_CATEGORIES);
    

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loadingCategories) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loadingCategories, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });

    setSelectedCategory(id);
  };

  return (
    <div style={{background:'rgb(153, 255, 102)',
     border:'solid',
     float:'left',
     borderRadius:20,
     objectFit:'cover',
     position: 'sticky'}}>
         <h2>Search for Products</h2>
        <div>
        <SearchBar/>
        </div>
      
      <h2>Choose a Category</h2>
      <select
        value={selectedCategory}
        onChange={(e) => {
          handleClick(e.target.value);
        }}
        style={{ margin: 10 }}
      >
        <option value="">All</option>
        {categories.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryMenu;
