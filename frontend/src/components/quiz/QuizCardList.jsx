import { React } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import QuizCard from './QuizCard';

function QuizCardList(props) {
  const {
    quizData, userAnswers, setUserAnswers, setFinished,
  } = props;
  return (
    <Container>
      {quizData && quizData.map((quiz, idx) => (
        <QuizCard
          quiz={quiz}
          key={idx}
          questionIdx={idx}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      ))}
      <Button
        variant="contained"
        sx={{ marginTop: '30px' }}
        onClick={() => setFinished(true)}
      >
        Finish Quiz
      </Button>
    </Container>
  );
}

export default QuizCardList;
