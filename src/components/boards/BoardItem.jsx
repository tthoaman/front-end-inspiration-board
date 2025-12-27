import './BoardItem.css';
import PropTypes from 'prop-types';

const BoardItem = ({id, title, owner, onSelectBoard}) => {

  const onSelected = () => {
    onSelectBoard(id)
    // console.log("selected!", id)
  }

  return(
    <li>
      <button onClick={()=> onSelected(id)} className="select-button-wrapper">
        <div className="title-style">{title} <span className="owner-style">({owner})</span></div>
        {/* <div className="owner-style">({owner})</div> */}
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