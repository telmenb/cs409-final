import { React } from 'react';
import { Container, Typography, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getApi } from '../../services/api';

function PreQuiz({
  numQuestions, setNumQuestions, questionDifficulty, setQuestionDifficulty, setQuizData,
}) {
  const getQuizData = async (e) => {
    e.preventDefault();

    const reqParams = {
      amount: numQuestions,
      difficulty: questionDifficulty,
    };
    const response = await getApi('/quizzes', reqParams);

    if (response.status === 200) {
      const quizDataArr = await response.json();
      setQuizData(quizDataArr);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        width: '50%',
        minWidth: '400px',
        marginTop: '20px',
        gap: '50px',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '10px',
          fontFamily: 'inherit',
          color: '#1976d2',
        }}
        variant="h4"
      >
        Select Quiz Options
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numQuestions}
          label="Amount"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(e) => setNumQuestions(e.target.value)}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={questionDifficulty}
          label="Type"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(e) => setQuestionDifficulty(e.target.value)}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ width: '50%' }} onClick={getQuizData}>
        Submit
      </Button>
    </Container>
  );
}

export default PreQuiz;
