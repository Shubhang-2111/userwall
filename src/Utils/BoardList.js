import React from 'react';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import './cssFiles/BoardList.css'

//THis component shows the list of board created by user
//User can delete any boards or update the board
// It receives props from the parent components boards, onSelectBoard, onDeleteBoard, onUpdateBoard

const BoardList = ({ boards, onSelectBoard, onDeleteBoard, onUpdateBoard }) => {
  return (
    <div className="list-group board-list">
      <h2>Boards List</h2>
      {boards.map((board, index) => (
        <div key={index} className="list-group-item display-flex">
          <button
            type="button"
            className="btn btn-link board-title"
            onClick={() => onSelectBoard(index)}
          >
            <h4 style={{color:"black"}}>{board.title}</h4>
          </button>
          <div className="float-right">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDeleteBoard(index)}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={() => {
                const newTitle = prompt('Enter new title:'); // Prompt box will ask to enter new title
                if (newTitle) {
                  const updatedBoard = { ...board, title: newTitle };
                  onUpdateBoard(updatedBoard);
                }
              }}
            >
              <RiPencilLine />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
