import { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './components/cards/CardList';
import Board from './components/boards/Board';
import './App.css'

function App() {
  const [cards, setCards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleSelectBoard = (boardId) => {
    const selected = boards.find((b) => b.id === boardId);
    setSelectedBoard(selected ?? null)
    showCardsForSelectedBoard(selected);
  };

  const showCardsForSelectedBoard = (board) => {
    if (!board) {
      setCards([]);
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/boards/${board.id}/cards`)
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
        console.error('There was an error fetching the cards!', error);
      });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/boards')
      .then((response) => {
        const boardsData = Array.isArray(response.data)
          ? response.data
          : response.data?.boards ?? [];

        setBoards(
          boardsData.map((board) => ({
            id: board.board_id ?? board.id,
            title: board.title,
            owner: board.owner,
          }))
        );
      })
      .catch((error) => {
        console.error('There was an error fetching the boards!', error);
      });
  }, []);

  const handleDeleteCard = (id) => {
    axios.delete(`http://127.0.0.1:5000/cards/${id}`)
    .then(() => {
      setCards((prevCards) => prevCards.filter((card) => card.card_id !== id));
    })
    .catch((error) => {
      console.error('There was an error deleting the card!', error);
    });
  };

  const handleCreateCard = (message) => {
    axios.post(
      `http://127.0.0.1:5000/boards/${selectedBoard.id}/cards`,
      { message }
    )
    .then((response) => {
      setCards((prev) => [...prev, response.data]);
    })
    .catch((error) => {
      console.error('There was an error creating the card!', error);
    });
  };

  return (
    <div className='app'>
      <aside className="sidebar">
        <Board
          boards={boards}
          onSelectBoard={handleSelectBoard}
          selectedBoardId={selectedBoard?.id}
        />
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
        <div className="card-list">
          <CardList
            cards={cards}
            onDeleteCard={handleDeleteCard}
            onCreateCard={handleCreateCard}
          />
        </div>
      </main>
    </div>
  )
}

export default App
