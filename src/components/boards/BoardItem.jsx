import './BoardItem.css';
import PropTypes from 'prop-types';

const BoardItem = ({id, title, owner, onSelectBoard, isSelected}) => {

  const onSelected = () => {
    onSelectBoard(id)
    // console.log("selected!", id)
  }

  return(
    <li className={isSelected ? "selected" : ""}>
      <button onClick={()=> onSelected(id)} className="select-button-wrapper">
        <div className="title-style">{title} <span className="owner-style">({owner})</span></div>
      </button>
    </li>
  )
}

BoardItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
}

export default BoardItem;