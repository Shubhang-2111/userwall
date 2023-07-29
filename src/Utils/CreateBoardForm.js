import React, { useState } from 'react';
import './cssFiles/CreateBoardForm.css'


// Uses onCreateBoards prop to add new board to the existing list in the parent component App
//THis component allows user to create new boards

const CreateBoardForm = ({ onCreateBoard }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onCreateBoard(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center mb-6" style={{padding:"5px"}}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter board title"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="submit" className="btn btn-primary m-2">
          Create
        </button>
        <br />
      </div>
    </form>
  );
};

export default CreateBoardForm;
