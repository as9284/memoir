import React, { useState, useEffect } from "react";
import { saveNoteContent, fetchNotesFromFirestore } from "../services/notes";

export const ExpandedNote = ({ title, closeModal, noteId, refreshNotes }) => {
  const [content, setContent] = useState("");
  const [editableTitle, setEditableTitle] = useState(title);
  const [scale, setScale] = useState(0.9);

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

    const timeoutId = setTimeout(() => setScale(1), 10);
    return () => clearTimeout(timeoutId);
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
    setTimeout(closeModal);
  };

  const handleCancel = () => {
    setTimeout(closeModal);
  };

  return (
    <>
      <div
        className="fixed w-full min-h-dvh flex justify-center items-center z-50"
        style={{
          transform: `scale(${scale})`,
          opacity: scale,
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
      >
        <div className="relative w-[100dvw] h-[100dvh] bg-memoir-light flex flex-col justify-center items-center gap-2">
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="absolute top-4 w-full text-2xl md:text-3xl font-bold bg-transparent text-center border-none outline-none px-4 py-2"
          />
          <div className="w-full h-3/4 flex justify-center items-center overflow-y-auto p-2">
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
            <button className="memoir-btn-dark w-32" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
