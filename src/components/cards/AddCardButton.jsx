import PropTypes from 'prop-types';
import { useState } from 'react';
import './AddCardButton.css'
import pinRed from "../../assets/red-pin.png";
import addCardIcon from "../../assets/add-card.svg";
import checkmarkIcon from "../../assets/checkmark.svg";
import deleteIcon from "../../assets/delete.png";

const AddCardButton = ({ onCreateCard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    const startEditing = () => setIsEditing(true);
    const cancelEditing = () => {
        setIsEditing(false);
        setMessage("");
    };

    const submit = (e) => {
        e.preventDefault();
        const text = message.trim();
        if (!text) return;
        try {
            onCreateCard && onCreateCard(text);
        } finally {
            setMessage("");
            setIsEditing(false);
        }
    };

    return (
        <article className="add_card">
            {/* pin */}
            <div
                className="card__pin"
                aria-hidden="true"
                style={{ backgroundImage: `url(${pinRed})` }}
            />

            <div className="add_card__content">
                {isEditing ? (
                    <form className="add_card__form" onSubmit={submit}>
                        <input
                            className="add_card__input"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            autoFocus
                        />
                        <footer className="add_card__footer">
                            <button
                                type="submit"
                                className="add_card__checkBtn button"
                                aria-label="Confirm add"
                            >
                                <img src={checkmarkIcon} alt="Confirm icon" />
                            </button>
                            <button
                                type="button"
                                className="add_card__delete button"
                                onClick={cancelEditing}
                                aria-label="Cancel add"
                            >
                                <img src={deleteIcon} alt="Delete icon" />
                            </button>
                        </footer>
                    </form>
                ) : (
                    <button
                        className="add_card__addBtn button"
                        onClick={startEditing}
                        aria-label="Add card"
                    >
                        <img src={addCardIcon} alt="Add card icon" />
                    </button>
                )}
            </div>
        </article>
    );
}; 

AddCardButton.propTypes = {
    onCreateCard: PropTypes.func,
};

export default AddCardButton;