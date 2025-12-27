import BoardItem from "./BoardItem";
import PropTypes from 'prop-types';
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