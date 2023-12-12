/* eslint-disable react/jsx-no-bind */
import { React, useState } from 'react';
import { Container } from '@mui/material';
import PreQuiz from '../components/quiz/PreQuiz';
import { getApi } from '../services/api';
import QuizCard from '../components/quiz/QuizCard';

function Quiz() {
  const [numQuestions, setNumQuestions] = useState(10);
  const [questionDifficulty, setQuestionDifficulty] = useState('easy');
  const initUsrVals = new Array(2);
  initUsrVals.fill('');
  const [quizData, setQuizData] = useState(undefined);
  const [usrAnswers, setUsrAnswers] = useState(initUsrVals);

  const getQuizData = async (e) => {
    e.preventDefault();

    const reqParams = {
      amount: numQuestions,
      difficulty: questionDifficulty,
    };
    const response = await getApi('/quizzes', reqParams);

    if (response.status === 200) {
      const quizDataJson = await response.json();
      setQuizData(quizDataJson);
    }
  };

  function handleAnswerChange(idx, value) {
    const newArr = usrAnswers.map((v, id) => {
      if (id === idx) {
        return value;
      }
      return v;
    });
    setUsrAnswers(newArr);
  }

  return (
    <Container>
      { quizData ? quizData.map((quizDataInfo, idx) => (
        <QuizCard
          question={quizDataInfo.question}
          incAnswers={quizDataInfo.incorrect_answers}
          cAnswer={quizDataInfo.correct_answer}
          picture={quizDataInfo.imgUrl}
          questionId={idx}
          onChange={handleAnswerChange}
        />
      )) : (
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
