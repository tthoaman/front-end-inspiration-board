import { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './components/cards/CardList';
import Board from './components/boards/Board';
import './App.css'
import { BACKEND_URL } from "./config";

fetch(`${BACKEND_URL}/boards`);

function App() {
  const [cards, setCards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleSelectBoard = (boardId) => {
    const selected = boards.find((b) => b.board_id === boardId);
    setSelectedBoard(selected ?? null)
    showCardsForSelectedBoard(selected);
  };

  const showCardsForSelectedBoard = (board) => {
    if (!board) {
      setCards([]);
      return;
    }

    axios
      .get(`${BACKEND_URL}/boards/${board.board_id}/cards`)
      .then((response) => {
        setCards(response.data.cards);
      })
      .catch((error) => {
        console.error('There was an error fetching the cards!', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/boards`)
      .then((response) => {
        setBoards(response.data.boards);
      })
      .catch((error) => {
        console.error('There was an error fetching the boards!', error);
      });
  }, []);

  const handleDeleteCard = (id) => {
    axios.delete(`${BACKEND_URL}/cards/${id}`)
    .then(() => {
      setCards((prevCards) => prevCards.filter((card) => card.card_id !== id));
    })
    .catch((error) => {
      console.error('There was an error deleting the card!', error);
    });
  };

  const handleCreateCard = (message) => {
    axios.post(
      `${BACKEND_URL}/boards/${selectedBoard.board_id}/cards`,
      { message }
    )
    .then((response) => {
      setCards((prev) => [...prev, response.data]);
    })
    .catch((error) => {
      console.error('There was an error creating the card!', error);
    });
  };

  const handleEditCard = (id, message) => {
    axios.patch(`${BACKEND_URL}/cards/${id}`, { message })
      .then((response) => {
      setCards((prev) => prev.map((card) => 
        card.card_id === response.data.card_id ? response.data : card));
    })
      .catch((error) => {
        console.error('There was an error creating the card!', error);
    });
  }

  const handleLikeCard = (id) => {
    axios.post(`${BACKEND_URL}/cards/${id}/like`)
    .then((response) => {
      setCards((prevCards) =>
        prevCards.map((c) => (c.card_id === response.data.card_id ? response.data : c))
      );
    })
    .catch((error) => {
      console.error('There was an error liking the card!', error);
    });
  };

  const handleCreateBoard = (newBoard) => {
    axios.post(`${BACKEND_URL}/boards`, newBoard)
    .then(response => {
      setBoards((prevBoards) => [...prevBoards, response.data]);
      setSelectedBoard(response.data);
      showCardsForSelectedBoard(response.data);
    })
    .catch(error => console.error('There was an error when creating a board!', error));
  };

  const handleDeleteBoard = (id) => {
    // checking cardCount right after card is created
    const isDeletingSelected = selectedBoard?.board_id === id; //boolean
    const cardCount = isDeletingSelected ? cards.length: 0;

    const ok = window.confirm(
      cardCount > 0
      ? `This board has ${cardCount} cards - deleting will remove them too. Are you sure?`
      : "Delete this board? Are you sure?"
    )
    if (!ok) return;

    // delete board and eixisting cards
    axios.delete(`${BACKEND_URL}/boards/${id}`)
    .then(() => {
      setBoards((prevBoards) => prevBoards.filter((board) => board.board_id !== id));
    
      setSelectedBoard((prevSelected) => {
        if (!prevSelected) return null;
        return prevSelected.board_id === id ? null: prevSelected;
      })

      // important: if you deleted the selected board, clear the cards state too
      if (isDeletingSelected) setCards([]);
    })
    .catch((error) => {
      console.error('There was an error deleting the board!', error);
    });
  };


  return (
    <div className='app'>
      <aside className="sidebar">
        <Board
          boards={boards}
          onSelectBoard={handleSelectBoard}
          selectedBoardId={selectedBoard?.board_id}
          onCreateBoard={handleCreateBoard}
          onDeleteBoard={handleDeleteBoard}
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
          {selectedBoard &&
            <CardList
              cards={cards}
              onDeleteCard={handleDeleteCard}
              onCreateCard={handleCreateCard}
              onLikeCard={handleLikeCard}
              onEditCard={handleEditCard}

            />
          }
        </div>
      </main>
    </div>
  )
}

export default App
