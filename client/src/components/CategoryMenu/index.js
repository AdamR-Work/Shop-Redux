import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
// import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

function CategoryMenu() {
  //v1
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];
  //v2
  // const [state, dispatch] = useStoreContext();
  // const { categories } = state;
  //v3
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

//  USEEFFECT BEFORE PWA

  // useEffect(() => {
  //   // if categoryData exists or has changed from the response of useQuery, then run dispatch()
  //   if (categoryData) {
  //     // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
  //     dispatch({
  //       type: UPDATE_CATEGORIES,
  //       categories: categoryData.categories
  //     });
  //   }
  // }, [categoryData, dispatch]);

// useEffect WITH PWA 

//  useEffect(()=>{
//   if (categoryData) {
//     dispatch({
//       type: UPDATE_CATEGORIES,
//       categories: categoryData.categories
//     });
//     categoryData.categories.forEach(category => {
//       idbPromise('categories', 'put', category);
//     });
//   }})

// useEffect WITH PWA AND ...Loading

useEffect(() => {
  if (categoryData) {
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
    categoryData.categories.forEach(category => {
      idbPromise('categories', 'put', category);
    });
  } else if (!loading) {
    idbPromise('categories', 'get').then(categories => {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categories
      });
    });
  }
}, [categoryData, loading, dispatch]);

  const handleClick = id => {
    console.log(id)
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };
  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
