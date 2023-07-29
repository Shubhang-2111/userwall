import React, { useState } from 'react';
import BoardList from './Utils/BoardList';
import BoardDetails from './Utils/BoardDetails';
import CreateBoardForm from './Utils/CreateBoardForm';
import Navbar from './Utils/NavBar';
import './App.css';

// Main parent component
// Allows user to create board

const App = () => {

  // defines various states to be used for creation and storage
  const [boards, setBoards] = useState([]);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  // handles functions to react to the changes made by users

  const handleCreateBoard = (title) => {
    const newBoard = {
      title: title,
      thoughts: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setSelectedBoardIndex(boards.length);
  };

  const handleUpdateBoard = (updatedBoard) => {
    const updatedBoards = boards.map((board, index) => {
      if (index === selectedBoardIndex) {
        return updatedBoard;
      }
      return board;
    });
    setBoards(updatedBoards);
  };

  const handleDeleteBoard = (index) => {
    const updatedBoards = boards.filter((_, i) => i !== index);
    setBoards(updatedBoards);
    setSelectedBoardIndex(null);
  };

  const handleSelectBoard = (index) => {
    setSelectedBoardIndex(index);
  };

  // Searches a partiular board using the title given by user

  // Clear search to see all the list of boards
  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSelectedBoardIndex(null);
    setShowNoResultsMessage(false);
    if (query !== '') {
      const searchResults = boards.filter((board) =>
        board.title.toLowerCase().includes(query)
      );
      if (searchResults.length === 0) {
        setShowNoResultsMessage(true);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedBoardIndex(null);
    setShowNoResultsMessage(false);
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm)
  );

  const selectedBoard =
    selectedBoardIndex !== null ? boards[selectedBoardIndex] : null;

  return (
    <div id="main">
      <Navbar />
      <div className="container mt-4" id="cont">
        <div className="row">
          <div className="col-md-4">
            <h2>Create a Board</h2>
            <CreateBoardForm onCreateBoard={handleCreateBoard} />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search boards..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {showNoResultsMessage && (
              <strong>
                <p style={{ color: 'white' }}>
                  No boards found. Please clear the search.
                </p>
              </strong>
            )}
            {searchTerm === '' ? (
              <BoardList
                boards={boards}
                onSelectBoard={handleSelectBoard}
                onDeleteBoard={handleDeleteBoard}
                onUpdateBoard={handleUpdateBoard}
              />
            ) : (
              <BoardList
                boards={filteredBoards}
                onSelectBoard={handleSelectBoard}
                onDeleteBoard={handleDeleteBoard}
                onUpdateBoard={handleUpdateBoard}
              />
            )}
          </div>
          <div className="col-md-8">
            {selectedBoard ? (
              <BoardDetails
                boards={boards}
                selectedBoard={selectedBoardIndex}
                onUpdateBoard={handleUpdateBoard}
              />
            ) : (
              <p>No board selected.</p>
            )}
          </div>
        </div>
        {searchTerm !== '' && (
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearSearch}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
