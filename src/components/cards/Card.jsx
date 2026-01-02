import PropTypes from 'prop-types';
import './Card.css'
import heartIcon from "../../assets/heart.svg";
import pinRed from "../../assets/red-pin.png";
import deleteIcon from "../../assets/delete.png";
import { useState } from 'react';

const Card = ({ card, onDeleteCard, onLikeCard, onEditCard }) => {
  const {card_id, message, likes_count} = card
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleSave = () => {
    onEditCard(card_id, editedMessage);
    setIsEditing(false);
  };

  return (
    <article className="card">
      {/* pin */}
      <div className="card__pin" aria-hidden="true" style={{ backgroundImage: `url(${pinRed})` }} />
      
      {/* message */}
      {isEditing ? (
        <textarea
          className="add_card__input"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p
          className="card__message"
          onClick={() => setIsEditing(true)}
        >
          {message}
        </p>
      )}

      {/* footer */}
      <footer className="card__footer">
        <div className="card__likes">
          {/* heart button */}
          <button
            className="card__likeBtn button"
            onClick={() => onLikeCard(card_id)}
            aria-label="Like"
          >
            <img src={heartIcon} alt="Heart icon" />
          </button>

          {/* likes counter */}
          <span className="card__likesCount">{likes_count}</span>
        </div>

        {/* delete */}
        <button
          className="card__delete button"
          onClick={() => onDeleteCard(card_id)}
          aria-label="Delete card"
        >
          <img src={deleteIcon} alt="Delete icon" />
        </button>
      </footer>
    </article>
  );
}; 

Card.propTypes = {
  card: PropTypes.shape(
    {
    card_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    }
  ),
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;
