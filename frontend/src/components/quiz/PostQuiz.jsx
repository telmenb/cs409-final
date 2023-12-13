import React, { useState, useEffect } from 'react';
import {
  Card, Typography, Grid, Button,
} from '@mui/material';

function PostQuiz(props) {
  const {
    quizData, setQuizData, setFinished, userAnswers,
  } = props;
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    let correctAnswers = 0;
    quizData.forEach((quiz, idx) => {
      if (quiz.correct_answer === userAnswers[idx]) {
        correctAnswers += 1;
      }
    });
    setCorrect(correctAnswers);
  }, [userAnswers]);

  const handleTryAgain = () => {
    setQuizData(undefined);
    setFinished(false);
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '70%',
        marginTop: '50px',
        padding: '20px 40px',
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontFamily: 'inherit', color: '#1976d2' }}
      >
        Results:
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        sx={{ marginTop: '40px' }}
      >
        <Grid item>
          <Typography variant="h4">
            {Math.round((correct / quizData.length) * 10000) / 100}
            %
          </Typography>
          <Typography variant="subtitle1" color="grey">
            Score
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {correct}
          </Typography>
          <Typography variant="subtitle1" color="grey">
            Out of&nbsp;
            {quizData.length}
            &nbsp;questions
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ marginTop: '40px' }}
        onClick={handleTryAgain}
      >
        Try Again
      </Button>
    </Card>
  );
}

export default PostQuiz;
