import { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './components/cards/CardList';
import './App.css'

function App() {
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/boards/1/cards')
      .then((response) => {
        const cardsData = Array.isArray(response.data)
          ? response.data
          : response.data?.cards ?? [];

        setCards(
          cardsData.map((card) => ({
            card_id: card.card_id ?? card.id,
            message: card.message,
            likesCount: card.likes_count ?? card.likesCount ?? 0,
          }))
        );
      })
      .catch((error) => {
        setErrorMessage('Error fetching cards. Please try again later.');
        console.error('There was an error fetching the cards!', error);
      });
  }, []);

  const handleDeleteCard = (id) => {
    axios.delete(`http://127.0.0.1:5000/cards/${id}`)
    .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card.card_id !== id));
    })
    .catch((error) => {
        setErrorMessage('Error deleting card. Please try again later.');
        console.error('There was an error deleting the card!', error);
    });
  };

  return (
    <>
      <h1>Inspiration Board</h1>
      <CardList cards={cards} deleteCard={handleDeleteCard} />
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!errorMessage && cards.length === 0 && (
        <p className="empty">No cards yet. Add one to get started!</p>
      )}
    </>
  )
}

export default App
