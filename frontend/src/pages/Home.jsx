import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import CardGrid from '../components/CardGrid';

function Home() {
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
        gap: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">
        Hello GeoQuizzr!
      </Typography>
      { cardsData && (
        <CardGrid
          cardData={cardsData}
        />
      )}
    </Container>
  );
}

export default Home;
