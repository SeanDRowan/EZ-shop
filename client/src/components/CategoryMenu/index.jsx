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
  const mediaMatch = window.matchMedia('(min-width: 1505px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  const { categories } = state;

  const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_CATEGORIES);
  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

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
  
  const button = {
    container: small => ({
      display: small ?'block' : 'none',
      margin: 10,
      width:140,
      background: 'white',
      border: 'solid',
      borderColor: 'green',
      color: 'green',
    })}

  const category = {
    container: small => ({
      justifyContent: 'space-around',
      background: 'rgb(0, 102, 0)',
      leftMargin: '10px',
      width: '10pc',
      border: 'solid',
      float: small ? 'left': 'right',
      borderRadius: 20,
      objectFit: 'cover',
      position: small ?  'fixed': 'relative',
      height: small ? `${categories
        .filter(
          (item) =>
            selectedCategory === '' || item._id === selectedCategory
        )
        .length * 70}px` : 100,
    })
  };
  return (
    <div style={category.container(matches)}
>
    <h2 style={{ borderRadius: '17px 17px 17px 17px',
     margin: '0', 
     fontSize: '1.5rem',
      color: 'white',
       textAlign: 'center',
       marginBottom: 7,
         background: 'rgb(0, 51, 102)',
          }}>Choose a Category</h2>
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
          style={button.container(matches)}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Button>
      ))}

        <Button
          style={{
          display: 'block',
          margin: 10,
          background: 'white',
          border: 'solid',
          borderColor: 'green',
          color: 'green',
         }}
          onClick={() => {
            handleClick('');
         }}
        >
          All Products
        </Button>
        <style>
         {`
          @media (max-width: 768px) {
          width: 100%;
          height: auto;
          position: relative;
          float: none;
         }
        `}
        </style>
  </div>
);
}





export default CategoryMenu;
