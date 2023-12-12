import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Grid, Divider, CardMedia,
} from '@mui/material';

function AnswerCard(props) {
  const { card } = props;
  const [frontText, setFrontText] = useState('');

  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  useEffect(() => {
    const choices = [card.correct_answer].concat(card.incorrect_answers)
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let text;
    if (choices.length === 4) {
      text = `${card.question}\na. ${choices[0]}\nb. ${choices[1]}\nc. ${choices[2]}\nd. ${choices[3]}`;
    } else {
      text = `${card.question}\na. ${choices[0]}\nb. ${choices[1]}`;
    }
    setFrontText(decodeHtml(text));
  }, [card.question]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          {/* Question */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {frontText}
            </Typography>
          </Grid>
          {/* Image */}
          <Grid item xs={12} md={1}>
            <CardMedia
              component="img"
              src={card.imageUrl}
              height="200" // Adjust the height as needed
              width="auto"
              style={{ maxWidth: '100%', height: 'auto' }} // Ensure the image fits within the container
            />
          </Grid>
          {/* Divider */}
          <Grid item xs={1} md={1}>
            <Divider orientation="vertical" />
          </Grid>
          {/* Answer */}
          <Grid item xs={11} md={6}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {decodeHtml(card.correct_answer)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AnswerCard;
