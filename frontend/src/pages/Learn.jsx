import React, { useState, useEffect } from 'react';
import { getApi } from '../services/api';
import Review from '../components/learn/Review';
import SelectLevel from '../components/learn/SelectLevel';

function Learn() {
  const [cardsData, setCardsData] = useState(undefined);
  const [difficulty, setDifficulty] = useState(undefined);

  async function getCardsData(diff) {
    const response = await getApi('/quizzes', { amount: 30, difficulty: diff });
    if (response.status === 200) {
      const json = await response.json();
      setCardsData(json);
    }
  }

  useEffect(() => {
    if (difficulty) {
      getCardsData(difficulty);
    }
  }, [difficulty]);

  return (
    <div>
      { cardsData
        ? <Review cardsData={cardsData} />
        : <SelectLevel setDifficulty={setDifficulty} />}
    </div>
  );
}

export default Learn;
