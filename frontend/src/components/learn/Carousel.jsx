import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import FlashCard from './FlashCard';

function Carousel(props) {
  const { cardData } = props;

  return (
    <MuiCarousel
      autoPlay={false}
      indicators={false}
      navButtonsAlwaysVisible
      sx={{ width: '800px', height: '600px' }}
    >
      {
        cardData.map((card, idx) => (
          <FlashCard
            key={idx}
            card={card}
          />
        ))
      }
    </MuiCarousel>
  );
}

export default Carousel;
