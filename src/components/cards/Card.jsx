import PropTypes from 'prop-types';
import './Card.css'

const Card = ({card, handleDeleteCard, handleCreateCard, handleLikeCard}) => {
    const {card_id, message, likesCount} = card
    const handleAddLikes = () => {
        handleLikeCard(card_id);
        console.log(`This post id is ${card_id}`);
    };

    return (
        <>
    <li className="cards__item">
        {message}
      <button
        className="cards__heart__toggle button" 
        onClick={() => handleLikeCard(card_id)}
      >
        ❤️ 
      </button>
        {likesCount}
      <button
        className="cards__item__remove button"
        onClick={() => handleDeleteCard(card_id)}>
      x</button>
    </li>
    <li className="cards__item">
        
      <button
        className="cards__add_toggle button" 
        onClick={() => handleCreateCard(card_id)}
      >
        ❤️ 
      </button>
        
      
    </li> </> 
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
    handleDeleteCard: PropTypes.func.isRequired,
    handleCreateCard: PropTypes.func.isRequired,
    handleLikeCard: PropTypes.func.isRequired,
};

export default Card;
