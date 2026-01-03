import './BoardItem.css';
import PropTypes from 'prop-types';
import trashIcon from '../../assets/trash-bin-gray.png'

const BoardItem = ({id, title, owner, onSelectBoard, isSelected, onDeleteBoard}) => {

  // const handleSelect = () => {
  //   onSelectBoard(id);
  // }

  return(
    <li className={isSelected ? "selected" : ""}>
      <button onClick={() => onSelectBoard(id)} className="select-button-wrapper">
        <div className="title-style">{title} <span className="owner-style">({owner})</span></div>
      </button>
      {isSelected && (
        <button onClick={() => onDeleteBoard(id)} className="board-delete-btn" aria-label="Delete board">
          <img src={trashIcon} alt="trash icon" className="trash-icon"/>
        </button>
        )}
    </li>
  )
}

BoardItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onDeleteBoard: PropTypes.func.isRequired
}

export default BoardItem;