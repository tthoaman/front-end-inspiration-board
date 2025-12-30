import './App.css'
import { useState, useEffect } from 'react';
import Board from './components/boards/Board';
import BoardData from './data/boards-data'; 
import NewBoardForm from './components/boards/NewBoardForm';
import axios from 'axios'

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

const getAllBoardsAPI = () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
    .then(response => response.data.boards)
    .catch(error => console.log(error));
};

const convertFromAPIBoard = (apiBoard) => {
  return {
    boardId: apiBoard.board_id,
    title: apiBoard.title,
    owner: apiBoard.owner,
  };
};

const addBoardAPI = (newBoard) => {
  return axios
  .post(`${VITE_APP_BACKEND_URL}/boards`, newBoard)
};

function App() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [boardsData,setBoardData] = useState([])
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);

  const getAllBoards = () => {
  return getAllBoardsAPI()
    .then(boards => {
      const newBoards = boards.map(convertFromAPIBoard);
      setBoardData(newBoards);
    })
};

  const handleSelectBoard = (boardId) => {
    const selected = boardsData.find((b) => b.boardId === boardId);
    setSelectedBoard(selected ?? null)
  }

  const onHandleSubmitBoard = (data) =>{
    return addBoardAPI(data)
      .then((result) => {
        return setBoardData((prevBoards) => [...prevBoards,convertFromAPIBoard(result.data)]);
      });
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
  <>
    <div className='app'>
      <aside className="sidebar">
        <Board 
          boardsData={boardsData}
          onSelectBoard={handleSelectBoard}
          selectedBoardId={selectedBoard?.board_id}
          onCreateNewBoard={() => setShowNewBoardForm(true)} 
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
        {/* <CardList /> */}
      </main>
    </div>

    {showNewBoardForm && (
      <div className="modal-overlay">
        <NewBoardForm
          onHandleSubmit={(data) => {
            onHandleSubmitBoard(data).then(() => setShowNewBoardForm(false));
          }}
          onCancel={() => setShowNewBoardForm(false)}
          className="popup-form"
        />
      </div>
    )}
  </>
  );
}

export default App
