import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';
import FlashCard from './FlashCard';

function Carousel(props) {
  const { cardData } = props;

  return (
    <MuiCarousel
      autoPlay={false}
      indicators={false}
      navButtonsAlwaysVisible
      sx={{ width: '700px', height: '500px' }}
    >
      {
        cardData.map((card) => (
          <FlashCard
            frontText={card.frontText}
            backText={card.backText}
            imgSrc={card.imgSrc}
          />
        ))
      }
    </MuiCarousel>
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
