import React from "react";

const Note = ({ note, onDelete }) => {
  return (
    <div className="p-1">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.detail}</p>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(note.id)}
        >
          Hapus
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Note;
