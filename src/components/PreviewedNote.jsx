import React, { useEffect, useState } from "react";
import { fetchNotesFromFirestore } from "../services/notes";

export const PreviewedNote = ({ title, noteId, closeModal }) => {
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

  return (
    <div
      className="fixed w-full min-h-dvh flex justify-center items-center z-50"
      style={{
        transform: `scale(${scale})`,
        opacity: scale,
        transition: "transform 0.2s ease, opacity 0.2s ease",
      }}
    >
      <div className="relative w-[100dvw] h-[100dvh] bg-memoir-light flex flex-col justify-center items-center gap-2 dark:bg-memoir-darker duration-200">
        <h2 className="text-2xl md:text-3xl font-bold select-none">
          Note Preview
        </h2>
        <div className="w-full md:w-3/4 h-3/4 flex flex-col justify-center items-center overflow-y-auto p-4 gap-2">
          <p className="w-full text-xl font-bold py-2 text-memoir-light text-center break-words whitespace-normal">
            {editableTitle}
          </p>

          <div className="w-full h-full px-2 py-2 text-memoir-light break-words whitespace-normal overflow-y-auto">
            {content}
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-4">
          <button
            className="memoir-btn-dark w-32 dark:memoir-btn dark:w-32"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
