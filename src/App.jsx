import './App.css'
import { useState } from 'react';
import Board from './components/boards/Board';
import boardsData from './data/boards-data'; 


function App() {
  const [selectedBoard, setSelectedBoard] = useState(null)

  const handleSelectBoard = (boardId) => {
    const selected = boardsData.find((b) => b.board_id === boardId);
    setSelectedBoard(selected ?? null)
  }

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
        <div className="selected-board-title">
          <h1>{selectedBoard ? `${selectedBoard.title} (${selectedBoard.owner})`: "Select a board"}</h1>
        </div>
        {/* <CardList /> */}
      </main>
    </div>
  )
}

export default App
