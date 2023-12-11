import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import AnswerCard from './AnswerCard';

function AnswerCardList(props) {
  const { cardData } = props;

  return (
    <Box marginTop={4}>
      <Container>
        <Grid container spacing={2}>
          {cardData && cardData.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <AnswerCard
                question={item.frontText}
                answer={item.backText}
                imageUrl={item.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AnswerCardList;
