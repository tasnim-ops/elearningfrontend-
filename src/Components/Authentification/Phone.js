import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/categorySlice';

const Phone = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>Phone</div>
      <div>
        {categories.map((item) => (
          <div key={item.id}>
      
          </div>
        ))}
      </div>
    </>
  );
  
};

export default Phone;
