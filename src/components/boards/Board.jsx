import './Board.css'
import boardIcon from '../../assets/boards-icon.png';
import BoardList from '../boards/BoardList';

const Board = ({boards, onSelectBoard, selectedBoardId}) => {
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
        />
      </div>
    </div>
  )
}

export default Board;