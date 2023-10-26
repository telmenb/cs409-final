import React, { useState } from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';
import Card from './Card';

function Carousel(props) {
  const { cardData } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="app-c">
      <button
        type="button"
        className="nav-btn"
        onClick={previousImage}
      >
        Prev
      </button>
      <div>
        <Card
          name={cardData[currentImageIndex].name}
          description={cardData[currentImageIndex].description}
          image={cardData[currentImageIndex].imgSrc}
        />
      </div>
      <button
        type="button"
        className="nav-btn"
        onClick={nextImage}
      >
        Next
      </button>
    </div>
  );
}

Carousel.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Carousel;
