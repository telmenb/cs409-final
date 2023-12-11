import React from 'react';
import {
  Card, CardContent, Typography, Grid, Divider, CardMedia,
} from '@mui/material';

function AnswerCard(props) {
  const { question, answer, imageUrl } = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          {/* Question */}
          <Grid item xs={12} md={4}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {question}
            </Typography>
          </Grid>
          {/* Image */}
          { imageUrl && (
            <Grid item xs={12} md={1}>
              <CardMedia
                component="img"
                src={imageUrl}
                height="200" // Adjust the height as needed
                width="auto"
                style={{ maxWidth: '100%', height: 'auto' }} // Ensure the image fits within the container
              />
            </Grid>
          )}
          {/* Divider */}
          <Grid item xs={1} md={1}>
            <Divider orientation="vertical" />
          </Grid>
          {/* Answer */}
          <Grid item xs={11} md={6}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {answer}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AnswerCard;
