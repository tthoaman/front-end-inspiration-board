import { useState } from 'react';
import BoardItem from "./BoardItem";
import PropTypes from 'prop-types';
import plusIcon from '../../assets/plus-icon.png'
import './BoardList.css';
import NewBoardForm from "./NewBoardForm";

const BoardList = ({ boards, onSelectBoard, selectedBoardId, onCreateBoard }) => {
  
  const [isFormOpen, setIsCreateOpen] = useState(false);
  
  const openCreateModal = () => setIsCreateOpen(true);
  const onCloseForm = () => setIsCreateOpen(false);

  return (
    <>
      <ul className="board-list">
        {boards.map((item) => (
          <BoardItem
            key={item.board_id}
            id={item.board_id}
            title={item.title}
            owner={item.owner}
            onSelectBoard={onSelectBoard}
            isSelected={item.board_id === selectedBoardId}
          />
        ))}
        <li>
          <button className="create-new-board-button" onClick={openCreateModal}>
            <img src={plusIcon} alt="plus icon" width={13} />{" "}
            <span>Create new board</span>
          </button>
        </li>
      </ul>
      <NewBoardForm 
        onCreateBoard={onCreateBoard} 
        onCloseForm={onCloseForm} 
        formVisible={isFormOpen}
      />
    </>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      board_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectBoard: PropTypes.func.isRequired,
  selectedBoardId: PropTypes.number,
  onCreateBoard: PropTypes.func,
};

export default BoardList;