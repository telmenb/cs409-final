import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Carousel from '../components/Carousel';

function Slider() {
  const [cardsData, setCardsData] = useState(undefined);

  async function getCardsData() {
    const response = await fetch('http://localhost:4000/api/cards');
    if (response.status === 200) {
      const json = await response.json();
      setCardsData(json.cards);
    }
  }

  useEffect(() => {
    getCardsData();
  }, []);

  return (
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
  );
}

export default Slider;
