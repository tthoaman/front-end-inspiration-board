import './Board.css'
import boardIcon from '../../assets/boards-icon.png';

const Board = () => {
  return (
    <div className="boards-container">
      <div className="boards-banner">
        <img src={boardIcon} alt="boards-icon" className='boards-icon'/>
      <h4>Boards</h4>
      </div>
      <div className="board-items">
        <div>Christmas Family Wishlist</div>
        <div>New year Resolution</div>
        <div>Seattle Meetup</div>
        <div>New Year Resolution Ideas</div>
      </div>
    </div>
  )
}

export default Board;