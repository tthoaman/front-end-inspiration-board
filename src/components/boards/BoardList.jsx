import BoardItem from "./BoardItem";
import PropTypes from 'prop-types';
import plusIcon from '../../assets/plus-icon.png'
import './BoardList.css';

const BoardList = ({ boards, onSelectBoard, selectedBoardId, onOpenCreateBoard }) => {
  return (
    <ul className="board-list">
      {boards.map((item) => (
        <BoardItem
          key={item.board_id}
          id={item.board_id}
          title={item.title}
          owner={item.owner}
          onSelectBoard={onSelectBoard}
          isSelected={item.board_id === selectedBoardId}
        />
      ))}
      <li>
        <button className="create-new-board-button" onClick={onOpenCreateBoard}>
          <img src={plusIcon} alt="plus icon" width={13} />{" "}
          <span>Create new board</span>
        </button>
      </li>
    </ul>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      board_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  selectedBoardId: PropTypes.number,
  onOpenCreateBoard: PropTypes.func,
};

export default BoardList;