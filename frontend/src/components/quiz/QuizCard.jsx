import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// function ShuffleAnswers(incAnswers, cAnswer) {
//   const array = [...incAnswers, cAnswer];
//   let currentIndex = array.length;
//   let randomIndex = array.length;
//   while (currentIndex > 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }

function QuizCard(props) {
  const {
    question, incAnswers, cAnswer, picture, questionId, onChange,
  } = props;
  const answers = [...incAnswers, cAnswer];
  // const answers = ShuffleAnswers(incAnswers, cAnswer);
  const [value, setValue] = React.useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(questionId, e.target.value);
  };
  if (!picture) {
    return (
      <Paper elevation={3}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3">{question}</Typography>
          <FormControl>
            <FormLabel id="multiple-choice-answer-label">Pick an Answer</FormLabel>
            <RadioGroup
              aria-labelledby="multiple-choice-answer-radios"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {answers.map((ans) => (
                <FormControlLabel value={ans} control={<Radio />} label={ans} />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </Paper>
    );
  }
  return (
    <Paper elevation={3}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h3">{question}</Typography>
        <Box
          component="img"
          sx={{
            height: 300,
            width: 500,
          }}
          alt="Figure"
          src={picture}
        />
        <FormControl>
          <FormLabel id="multiple-choice-answer-label">Pick an Answer</FormLabel>
          <RadioGroup
            aria-labelledby="multiple-choice-answer-radios"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {answers.map((ans) => (
              <FormControlLabel value={ans} control={<Radio />} label={ans} />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Paper>
  );
}

QuizCard.defaultProps = {
  question: '',
  incAnswers: [],
  cAnswer: '',
  picture: '',
  questionId: 0,
  onChange: undefined,
};

export default QuizCard;
