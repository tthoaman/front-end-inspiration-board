import PropTypes from 'prop-types';
import './AddCardButton.css'
import pinRed from "../../assets/red-pin.png";
import addCardIcon from "../../assets/add-card.svg";

const AddCardButton = ({handleCreateCard}) => {
      return (
        <article className="add_card">
            {/* pin */}
            <div
                className="card__pin"
                aria-hidden="true"
                style={{ backgroundImage: `url(${pinRed})` }}
            />

            <div className="add_card__content">
                <button
                className="add_card__addBtn button"
                onClick={handleCreateCard}
                aria-label="Add card"
                >
                <img src={addCardIcon} alt="Add card icon" />
                </button>
            </div>
        </article>
  );
}; 

AddCardButton.propTypes = {
    handleCreateCard: PropTypes.func.isRequired,
};

export default AddCardButton;