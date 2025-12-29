import { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './components/cards/CardList';
import Board from './components/boards/Board';
import boardsData from './data/boards-data'; 
import './App.css'

function App() {
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleSelectBoard = (boardId) => {
    const selected = boardsData.find((b) => b.board_id === boardId);
    setSelectedBoard(selected ?? null)
  };

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
    <div className='app'>
      <aside className="sidebar">
        <Board 
          boardsData={boardsData}
          onSelectBoard={handleSelectBoard}
          selectedBoardId={selectedBoard?.board_id}/>
      </aside>
      <main>
        <div className="board-writing">
          <h1 className="left-writing">It always seems impossible</h1>
          <h1 className="right-writing">Until it is done</h1>
        </div>
        <div className="selected-board-banner">
          {selectedBoard ? (
            <h1>
              {selectedBoard.title}
              <span className="banner-owner">
                {" "}({selectedBoard.owner})
              </span>
            </h1>
          ): (
            <h1>Select a board</h1>
          )
        }
        </div>
        <CardList cards={cards} deleteCard={handleDeleteCard} />
      </main>
    </div>
  )
}

export default App
