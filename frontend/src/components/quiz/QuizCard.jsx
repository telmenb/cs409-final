import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function QuizCard(props) {
  const {
    quiz, questionIdx, userAnswers, setUserAnswers,
  } = props;
  const answers = [quiz.correct_answer].concat(quiz.incorrect_answers)
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const handleChange = (e) => {
    const arr = userAnswers;
    arr[questionIdx] = e.target.value;
    setUserAnswers(arr);
  };

  return (
    <Paper sx={{ marginTop: '30px', backgroundColor: '#FCFCFC' }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        padding={5}
      >
        <Typography variant="h5">
          {`${questionIdx + 1}. ${quiz.question}`}
        </Typography>
        { quiz.imageUrl && (
          <Box
            component="img"
            sx={{
              height: 100,
              width: 150,
              objectFit: 'contain',
            }}
            alt="Figure"
            src={quiz.imageUrl}
          />
        )}
        <FormControl>
          <RadioGroup
            aria-labelledby="multiple-choice-answer-radios"
            name="controlled-radio-buttons-group"
            onChange={handleChange}
          >
            {answers.map((ans, idx) => (
              <FormControlLabel value={ans} key={idx} control={<Radio />} label={ans} />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Paper>
  );
}

export default QuizCard;
