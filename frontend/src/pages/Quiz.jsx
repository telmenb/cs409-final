import { React, useState, useEffect } from 'react';
import { Container } from '@mui/material';
import PreQuiz from '../components/quiz/PreQuiz';
import QuizCardList from '../components/quiz/QuizCardList';
import PostQuiz from '../components/quiz/PostQuiz';

function Quiz() {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questionDifficulty, setQuestionDifficulty] = useState('easy');
  const [quizData, setQuizData] = useState(undefined);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (quizData) {
      setUserAnswers(new Array(quizData.length).fill(''));
    }
  }, [quizData]);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      {finished ? (
        <PostQuiz
          quizData={quizData}
          setQuizData={setQuizData}
          setFinished={setFinished}
          userAnswers={userAnswers}
        />
      ) : quizData ? (
        <QuizCardList
          quizData={quizData}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          setFinished={setFinished}
        />
      ) : (
        <PreQuiz
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          questionDifficulty={questionDifficulty}
          setQuestionDifficulty={setQuestionDifficulty}
          setQuizData={setQuizData}
        />
      )}
    </Container>

  );
}

export default Quiz;
