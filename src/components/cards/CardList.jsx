import PropTypes from 'prop-types';
import Card from './Card.jsx';
import AddCardButton from './AddCardButton.jsx';
import './CardList.css';

const CardList = ({ cards, deleteCard, createCard, likeCard }) => {
  const noop = () => {};
  const getCardListJSX = (cards) => {
    return cards.map((card) => {
      return (
        <Card
          card={card}
          handleDeleteCard={deleteCard}
          handleLikeCard={likeCard || noop}
        />
      );
    });
  };
  return (
    <ul className="cards__list no-bullet">
      {getCardListJSX(cards)}
      <AddCardButton handleCreateCard={createCard || noop} />
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
  deleteCard: PropTypes.func.isRequired,
  createCard: PropTypes.func,
  likeCard: PropTypes.func,
};

export default CardList;