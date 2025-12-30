import { useState } from 'react';
import './Board.css'
import boardIcon from '../../assets/boards-icon.png';
import BoardList from '../boards/BoardList';
import NewBoardForm from '../boards/NewBoardForm';

const Board = ({boards, onSelectBoard, selectedBoardId, onCreateBoard}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreateModal = () => setIsCreateOpen(true);
  const closeCreateModal = () => setIsCreateOpen(false);

  const handleCreateBoard = (newBoard) => {
    try {
      onCreateBoard && onCreateBoard(newBoard);
    } finally {
      closeCreateModal();
    }
  };
  return (
    <div className="boards-container">
      <div className="boards-top">
        <img src={boardIcon} alt="boards-icon" className='boards-icon'/>
        <h4 className='board-header'>Boards</h4>
      </div>
      <div className="board-items">
        <BoardList 
          boards={boards}
          onSelectBoard={onSelectBoard}
          selectedBoardId={selectedBoardId}
          onOpenCreateBoard={openCreateModal}
        />
      </div>
      {isCreateOpen && (
        <div className="modalOverlay" onClick={closeCreateModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Create New Board</h3>
              <button className="modalClose" onClick={closeCreateModal} aria-label="Close">×</button>
            </div>
            <div className="modalBody">
              <NewBoardForm onHandleSubmit={handleCreateBoard} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Board;