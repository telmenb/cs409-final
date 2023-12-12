import * as React from 'react';
import Grid from '@mui/material/Grid';
import FlashCard from './learn/FlashCard';

function CardGrid(props) {
  const { cardData } = props;

  return (
    <Grid container spacing={4} justifyContent="center">
      {cardData.map((card) => (
        <Grid item key={card.id} maxWidth={500}>
          <FlashCard
            frontText={card.frontText}
            backText={card.backText}
            imageUrl={card.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardGrid;
