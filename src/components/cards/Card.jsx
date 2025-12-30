import PropTypes from 'prop-types';
import './Card.css'
import heartIcon from "../../assets/heart.svg";
import pinRed from "../../assets/red-pin.png";
import deleteIcon from "../../assets/delete.png";

const Card = ({card, onDeleteCard, onLikeCard}) => {
  const {card_id, message, likesCount} = card

  return (
    <article className="card">
      {/* pin */}
      <div className="card__pin" aria-hidden="true" style={{ backgroundImage: `url(${pinRed})` }} />

      {/* message */}
      <p className="card__message">{message}</p>

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
          <span className="card__likesCount">{likesCount}</span>
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
        likesCount: PropTypes.number.isRequired,
        }
    ),
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired,
};

export default Card;
