import React from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';

const Home = () => {
  const location = useLocation();
  const name = location.state && location.state.name;


  return (
    <div className=''>
      <Carousel/>
       {name}
    </div>
  )
}

export default Home
