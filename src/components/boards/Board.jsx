import './Board.css'
import boardIcon from '../../assets/boards-icon.png';
import BoardList from '../boards/BoardList';

const Board = ({boardsData, onSelectBoard, selectedBoardId}) => {
  return (
    <div className="boards-container">
      <div className="boards-banner">
        <img src={boardIcon} alt="boards-icon" className='boards-icon'/>
      <h4>Boards</h4>
      </div>
      <div className="board-items">
        <BoardList 
        boards={boardsData}
        onSelectBoard={onSelectBoard}
        selectedBoardId={selectedBoardId}
        />
      </div>
    </div>
  )
}

export default Board;