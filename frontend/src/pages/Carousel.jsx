import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';

function Slider() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState(undefined);

  async function getCardsData() {
    const response = await fetch('http://localhost:4000/api/cards');
    if (response.status === 200) {
      const json = await response.json();
      setCardsData(json);
    }
  }

  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <div className="App">
      <h1>Learning HomePage</h1>
      <button type="button" onClick={() => navigate('/')}> Go to Grid View</button>
      {cardsData && (
      <Carousel
        cardData={cardsData.cards}
      />
      )}
    </div>
  );
}
export default Slider;
