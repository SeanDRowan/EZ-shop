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
import '../CategoryMenu/style.css';



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
    <div
  style={{
    background: 'rgb(153, 255, 102)',
    leftMargin: '10px',
    width: '10pc',
    border: 'solid',
    float: 'left',
    borderRadius: 20,
    objectFit: 'cover',
    position: 'fixed',
    height: `${categories
      .filter(
        (item) =>
          selectedCategory === '' || item._id === selectedCategory
      )
      .length * 70}px`,
  }}
>
    <h2 style={{ borderRadius: '17px 17px 17px 17px', margin: '0', fontSize: '1.5rem', color: 'white', textAlign: 'center', borderBottom: '2px solid white', background: 'grey', paddingBottom: '8px' }}>Choose a Category</h2>
    <select
      value={selectedCategory}
      onChange={(e) => {
        handleClick(e.target.value);
      }}
      style={{ margin: 1 }}
    >
      <option value="">All</option>
      {categories.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>

    <br/>

    {categories
      .filter((item) => selectedCategory === '' || item._id === selectedCategory)
      .map((item) => (
        <Button
          key={item._id}
          style={{
            display: 'block',
            margin: 10,
            background: 'white',
            border: 'solid',
            borderColor: 'green',
            color: 'green',
          }}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Button>
      ))}
  
  </div>
);
}

export default CategoryMenu;
