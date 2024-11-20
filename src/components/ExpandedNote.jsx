import React, { useState, useEffect } from "react";
import { saveNoteContent, fetchNotesFromFirestore } from "../services/notes";

export const ExpandedNote = ({ title, closeModal, noteId, refreshNotes }) => {
  const [content, setContent] = useState("");
  const [editableTitle, setEditableTitle] = useState(title);

  useEffect(() => {
    const loadContent = async () => {
      const notes = await fetchNotesFromFirestore();
      const note = notes.find((note) => note.id === noteId);
      if (note) {
        setContent(note.content || "");
        setEditableTitle(note.title || title);
      }
    };
    if (noteId) {
      loadContent();
    }
  }, [noteId, title]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleSave = async () => {
    await saveNoteContent(noteId, editableTitle, content);
    refreshNotes();
    closeModal();
  };

  return (
    <>
      <div className="fixed w-full min-h-dvh bg-memoir-dark/40 flex flex-col justify-center items-center">
        <div className="relative w-[90dvw] h-[90dvh] bg-memoir-light rounded-xl flex flex-col justify-center items-center gap-2">
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="absolute top-4 w-full text-2xl md:text-3xl font-bold bg-transparent text-center border-none outline-none px-4 py-2"
          />
          <div className="w-full h-3/4 flex justify-center items-center overflow-y-auto p-8">
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full h-full p-4 bg-transparent rounded-lg outline-none border-none resize-none placeholder:text-neutral-400"
              placeholder="Write your note here..."
            />
          </div>
          <div className="absolute bottom-4 w-full flex justify-center items-center gap-4">
            <button className="memoir-btn-dark w-32" onClick={handleSave}>
              Save
            </button>
            <button className="memoir-btn-dark w-32" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
