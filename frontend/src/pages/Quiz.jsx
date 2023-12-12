/* eslint-disable react/jsx-no-bind */
import { React, useState } from 'react';
import { Container } from '@mui/material';
import PreQuiz from '../components/quiz/PreQuiz';
import { getApi } from '../services/api';
import QuizCardList from '../components/quiz/QuizCardList';

function Quiz() {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questionDifficulty, setQuestionDifficulty] = useState('easy');
  const [quizData, setQuizData] = useState(undefined);
  const [userAnswers, setUserAnswers] = useState([]);

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
      setUserAnswers(new Array(quizDataArr.length).fill(''));
    }
  };

  return (
    <Container>
      { quizData
        ? (
          <QuizCardList
            quizData={quizData}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        ) : (
          <PreQuiz
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            questionDifficulty={questionDifficulty}
            setQuestionDifficulty={setQuestionDifficulty}
            getQuizData={getQuizData}
          />
        )}
    </Container>

  );
}

export default Quiz;
