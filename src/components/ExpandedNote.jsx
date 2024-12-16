import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
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

  const handleContentChange = (value) => {
    setContent(value);
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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <div
        className="fixed w-full min-h-dvh flex justify-center items-center z-50 overflow-y-auto p-4"
        style={{
          transform: `scale(${scale})`,
          opacity: scale,
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
      >
        <div className="relative w-[100dvw] h-[100dvh] bg-memoir-light flex flex-col justify-evenly items-center gap-2 dark:bg-memoir-darker duration-200">
          <h2 className="text-2xl md:text-3xl font-bold select-none">
            Edit Note
          </h2>
          <div className="w-full h-3/4 flex flex-col justify-center items-center p-4 gap-2">
            <div className="w-full flex flex-col justify-center items-center">
              <h3 className="w-full md:w-3/4 text-lg font-bold text-left py-1">
                Title:
              </h3>
              <input
                type="text"
                value={editableTitle}
                onChange={handleTitleChange}
                className="w-full md:w-3/4 rounded-lg px-4 py-2 bg-memoir-dark text-memoir-light shadow-md placeholder:text-neutral-400 placeholder:italic outline-none"
                placeholder="Enter the note title..."
              />
            </div>
            <div className="w-full md:w-3/4 h-full flex flex-col justify-start items-center">
              <h3 className="w-full text-lg font-bold text-left py-1">
                Content:
              </h3>
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                className="custom-quill-editor w-full h-full rounded-lg bg-memoir-dark text-memoir-light shadow-md outline-none overflow-y-auto"
                modules={quillModules}
                theme="bubble"
                placeholder="Write your note here..."
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-4 py-4">
            <button
              className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
