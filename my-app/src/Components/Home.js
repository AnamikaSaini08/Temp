import React from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';


const items = [
  { type: "image", src: "https://media.istockphoto.com/id/1421080285/photo/colored-books-on-light-background-education-school.jpg?b=1&s=170667a&w=0&k=20&c=_azu_R-5-a26wGlrtusK_CWPuYXa9vtPg4nREZQpQu0=", alt: "Image description" },
  { type: "video", src: "https://www.youtube.com/embed/gJDVEZJuAhc" },
  { type: "pdf", src: "https://www.africau.edu/images/default/sample.pdf" },
  { type: "game"}
];

const Home = () => {
  const location = useLocation();
  const name = location.state && location.state.name;


  return (
    <div className=''>
      <Carousel items={items}/>
      
       {name}
    </div>
  )
}

export default Home
