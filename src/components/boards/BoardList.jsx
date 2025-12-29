import BoardItem from "./BoardItem";
import PropTypes from 'prop-types';
import plusIcon from '../../assets/plus-icon.png'
import './BoardList.css';

const BoardList = ({boards, onSelectBoard, selectedBoardId}) => {

  return (
    <ul>
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
      <button className="create-new-board-button">
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
  ).isRequired
}


export default BoardList;