import BoardItem from "./BoardItem";
import PropTypes from 'prop-types';
import plusIcon from '../../assets/plus-icon.png'
import './BoardList.css';

const BoardList = ({boards, onSelectBoard, selectedBoardId, onCreateNewBoard}) => {

  return (
    <ul>
      {boards.map((item) => (
        <BoardItem 
          key={item.boardId}
          id={item.boardId}
          title={item.title}
          owner={item.owner}
          onSelectBoard={onSelectBoard}
          isSelected={item.board_id === selectedBoardId}
        />
      ))}
      <button className="create-new-board-button" onClick={onCreateNewBoard}>
        <img src={plusIcon} alt="plus icon" width={13}/>{" "}
        <span>Create new board</span>
      </button>
    </ul>
  )
}

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired
    })
  ).isRequired,
  onSelectBoard: PropTypes.func,
  selectedBoardId: PropTypes.number,
  onCreateNewBoard: PropTypes.func.isRequired, 
}


export default BoardList;