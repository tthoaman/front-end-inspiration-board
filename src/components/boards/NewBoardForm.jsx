import { useState } from 'react';
import './NewBoardForm.css'


const kDefaultFormState = { title: '', owner: '' };

const NewBoardForm = ({ onHandleSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSubmit({ ...formData });
    setFormData(kDefaultFormState);
  };

  const makeControlledInput = (inputName) => {
    return (
      <div>
        <label htmlFor={inputName}>
          {inputName}
        </label>
        <input
          type='text'
          name={inputName}
          id={inputName}
          value={formData[inputName]}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {makeControlledInput('Title')}
        {makeControlledInput('Owner')}
        <div>
          <input type="submit" value="Create board" />
        </div>
      </form>
    </div>
  );
};

export default NewBoardForm;