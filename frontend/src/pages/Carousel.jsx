import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Carousel from '../components/Carousel';
import { getApi } from '../services/api';
import AnswerCardList from '../components/AnswerCardList';

function Slider() {
  const [cardsData, setCardsData] = useState(undefined);

  async function getCardsData() {
    const response = await getApi('/cards');
    if (response.status === 200) {
      const json = await response.json();
      setCardsData(json.cards);
    }
  }

  useEffect(() => {
    getCardsData();
  }, []);

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

export default Slider;
