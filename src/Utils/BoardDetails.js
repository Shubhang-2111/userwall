import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import "./cssFiles/BoardDetails.css";

// Shows the user details posts,boards name for the selected board also enables user to upload new post 

const BoardDetails = ({ boards, selectedBoard, onUpdateBoard }) => {
  const board = boards[selectedBoard];
  const [thoughts, setThoughts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newThought, setNewThought] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [editingThoughtIndex, setEditingThoughtIndex] = useState(null);
  const [editingThoughtTitle, setEditingThoughtTitle] = useState("");
  const [editingThoughtText, setEditingThoughtText] = useState("");
  const [editingThoughtImageFile, setEditingThoughtImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  useEffect(() => {
    if (board) {
      setThoughts(board.thoughts);
    }
  }, [board]);

// Different handles function to handle any changes in the input text after clicking on buttons

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleThoughtChange = (e) => {
    setNewThought(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
  };

  const handleAddThought = () => {
    if (newThought) {
      const updatedThoughts = [
        ...thoughts,
        {
          title: newTitle,
          text: newThought,
          imageFile: newImageFile,
          likes: 0,
        },
      ];
      const updatedBoard = { ...board, thoughts: updatedThoughts };
      setThoughts(updatedThoughts);
      setNewTitle("");
      setNewThought("");
      setNewImageFile(null); // Reset the selected file
      onUpdateBoard(updatedBoard);
    }
  };

  // Increments likes whenever like is clicked

  const handleLikeThought = (index) => {
    const updatedThoughts = thoughts.map((thought, i) => {
      if (i === index) {
        return { ...thought, likes: thought.likes + 1 };
      }
      return thought;
    });
    const updatedBoard = { ...board, thoughts: updatedThoughts };
    setThoughts(updatedThoughts);
    onUpdateBoard(updatedBoard);
  };

  // Delete the post from the list

  const handleDeleteThought = (index) => {
    const updatedThoughts = thoughts.filter((_, i) => i !== index);
    const updatedBoard = { ...board, thoughts: updatedThoughts };
    setThoughts(updatedThoughts);
    onUpdateBoard(updatedBoard);
  };


  // Enables to change the post

  const handleEditThought = (index) => {
    const thoughtToEdit = thoughts[index];
    setEditingThoughtIndex(index);
    setEditingThoughtTitle(thoughtToEdit.title);
    setEditingThoughtText(thoughtToEdit.text);
    setEditingThoughtImageFile(thoughtToEdit.imageFile);
  };

  const handleConfirmEditThought = () => {
    if (editingThoughtText) {
      const updatedThoughts = thoughts.map((thought, i) => {
        if (i === editingThoughtIndex) {
          return {
            ...thought,
            title: editingThoughtTitle,
            text: editingThoughtText,
            imageFile: editingThoughtImageFile,
          };
        }
        return thought;
      });
      const updatedBoard = { ...board, thoughts: updatedThoughts };
      setThoughts(updatedThoughts);
      setEditingThoughtIndex(null);
      setEditingThoughtTitle("");
      setEditingThoughtText("");
      setEditingThoughtImageFile(null);
      onUpdateBoard(updatedBoard);
    }
  };

  const handleCancelEditThought = () => {
    setEditingThoughtIndex(null);
    setEditingThoughtTitle("");
    setEditingThoughtText("");
    setEditingThoughtImageFile(null);
  };


  // Enables user to search for the post

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const results = thoughts.filter((thought) =>
      thought.title.toLowerCase().includes(query)
    );
    setSearchResults(results);
    setShowNoResultsMessage(results.length === 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowNoResultsMessage(false);
  };

  // Checks the condition where there is any board selected to be displayed

  if (!board || thoughts.length === 0) {
    return (
      <div>
        <h2>{board ? board.title : "No board selected."}</h2>
        <p>No posts available.</p>
        <div className="d-flex flex-column align-items-center m-1 p-1">
          <input
            type="text"
            className="form-control m-1"
            placeholder="Enter post title"
            value={newTitle}
            onChange={handleTitleChange}
          />

          <input
            type="text"
            className="form-control m-1"
            placeholder="Whats's in your mind"
            value={newThought}
            onChange={handleThoughtChange}
          />
          <input
            type="file"
            className="form-control m-1"
            onChange={handleImageChange}
          />
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddThought}
          >
            Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>{board.title}</h2>
      <hr />
      <div className="d-flex flex-column align-items-center m-2 p-2">
        <input
          type="text"
          className="form-control m-1"
          placeholder="Enter post title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          className="form-control m-1"
          placeholder="What's on your mind..."
          value={newThought}
          onChange={handleThoughtChange}
        />
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="btn btn-primary my-2"
          onClick={handleAddThought}
        >
          Post
        </button>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search post by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
        {searchResults.length > 0 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
      {showNoResultsMessage && (
        <p>No thoughts found. Please clear the search.</p>
      )}
      <ul className="list-group">
        {(searchResults.length > 0 ? searchResults : thoughts).map(
          (thought, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{ backgroundColor: "rgb(245, 241, 241, 0.696)" }}
            >
              {editingThoughtIndex === index ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingThoughtTitle}
                    readOnly
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingThoughtText}
                    onChange={(e) => setEditingThoughtText(e.target.value)}
                  />
                  <input
                    type="file"
                    className="form-control mb-2"
                    onChange={(e) =>
                      setEditingThoughtImageFile(e.target.files[0])
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-2"
                    onClick={handleConfirmEditThought}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleCancelEditThought}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h2>Title : {thought.title}</h2>
                  </div>
                  <div>
                    <h5>{thought.text}</h5>
                  </div>
                  {thought.imageFile && (
                    <div>
                      <img
                        src={URL.createObjectURL(thought.imageFile)}
                        alt="Thought Image"
                        style={{ width: "200px", height: "200" }}
                      />
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mr-2"
                      onClick={() => handleLikeThought(index)}
                    >
                      <FaThumbsUp /> ({thought.likes})
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm mr-2"
                      onClick={() => handleDeleteThought(index)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEditThought(index)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BoardDetails;
