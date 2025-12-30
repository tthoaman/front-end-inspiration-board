import PropTypes from 'prop-types';
import Card from './Card.jsx';
import AddCardButton from './AddCardButton.jsx';
import './CardList.css';

const CardList = ({ cards, onDeleteCard, onCreateCard, onLikeCard }) => {
  const noop = () => {};
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          card={card}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard || noop}
        />
      );
    });
  };
  return (
    <ul className="cards__list no-bullet">
      {getCardListJSX(cards)}
      <AddCardButton onCreateCard={onCreateCard || noop} />
    </ul>
  )
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      likesCount: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func,
  onLikeCard: PropTypes.func,
};

export default CardList;