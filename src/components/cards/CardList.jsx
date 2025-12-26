import PropTypes from 'prop-types';
import Task from './Card.jsx';
import './CardList.css';

const CardList = ({ lists, handleDeleteCard, handleCreateCard, handleLikeCard}) => {
  const getCardListJSX = (lists) => {
    return lists.map((card) => {
      return (
        <Card
          card_id={card.card_id}
          like_counts={card.like_counts}
          message={card.message}
          handleDeleteCard={handleDeleteCard}
          handleCreateCard={handleCreateCard}
          handleLikeCard={handleLikeCard}
        />
      );
    });
  };
  return <ul className="cards__list no-bullet">{getCardListJSX(lists)}</ul>;
};

CardList.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      like_counts: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleCreateCard: PropTypes.func.isRequired,
  handleLikeCard: PropTypes.func.isRequired,
};

export default CardList;