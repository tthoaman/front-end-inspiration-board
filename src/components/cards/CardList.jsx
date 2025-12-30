import PropTypes from 'prop-types';
import Card from './Card.jsx';
import AddCardButton from './AddCardButton.jsx';
import './CardList.css';

const CardList = ({ cards, onDeleteCard, onCreateCard, onLikeCard }) => {

  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          card={card}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard}
        />
      );
    });
  };

  return (
    <ul className="cards__list no-bullet">
      {getCardListJSX(cards)}
      <AddCardButton onCreateCard={onCreateCard} />
    </ul>
  )
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      likes_count: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default CardList;