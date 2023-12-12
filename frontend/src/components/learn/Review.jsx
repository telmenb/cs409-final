import React from 'react';
import Container from '@mui/material/Container';
import Carousel from './Carousel';
import AnswerCardList from './AnswerCardList';

function Review(props) {
  const { cardsData } = props;
  return (
    <div>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alilgnItems: 'center',
        }}
      >
        {cardsData && (
        <Carousel
          cardData={cardsData}
        />
        )}
      </Container>
      <AnswerCardList cardData={cardsData} />
    </div>
  );
}

export default Review;
