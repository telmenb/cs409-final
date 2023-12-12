import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import AnswerCard from './AnswerCard';

function AnswerCardList(props) {
  const { cardData } = props;

  return (
    <Box marginTop={4}>
      <Container>
        <Grid container spacing={2}>
          {cardData && cardData.map((card, idx) => (
            <Grid item xs={12} key={idx}>
              <AnswerCard
                card={card}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AnswerCardList;
