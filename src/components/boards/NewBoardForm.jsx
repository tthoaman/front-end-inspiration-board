import { useState } from 'react';
import './NewBoardForm.css'


const kDefaultFormState = { title: '', owner: '' };

const NewBoardForm = ({ onCreateBoard, onCloseForm, formVisible }) => {
  
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateBoard({ ...formData });
    setFormData(kDefaultFormState);
  };

  if (!formVisible) {
    return null;
  }
  return (
    <div className="modalOverlay" onClick={onCloseForm}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>Create New Board</h3>
        </div>
        <div className="modalBody">
          <form className="newBoardForm" onSubmit={handleSubmit}>
            <div className="formRow">
              <label htmlFor="title">Board name</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Recipes, Travel, Ideas…"
                required
              />
            </div>

            <div className="formRow">
              <label htmlFor="owner">Owner</label>
              <input
                id="owner"
                name="owner"
                type="text"
                value={formData.owner}
                onChange={handleChange}
                placeholder="e.g. Kate"
                required
              />
            </div>

            <div className="formActions">
              <button type="button" className="btnPaper" onClick={() => setFormData(kDefaultFormState)}>
                Cancel
              </button>
              <button type="submit" className="btnPin">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBoardForm;