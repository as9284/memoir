import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { NewNote } from "../components/NewNote";
import { MdDelete } from "react-icons/md";
import {
  addNoteToFirestore,
  fetchNotesFromFirestore,
  deleteNoteFromFirestore,
} from "../services/notes";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await fetchNotesFromFirestore();
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);

  const addNote = async (title) => {
    if (title.trim()) {
      const newNote = await addNoteToFirestore(title);
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    try {
      await deleteNoteFromFirestore(id);
    } catch (error) {
      setNotes((prevNotes) => [
        ...prevNotes,
        notes.find((note) => note.id === id),
      ]);
      console.error("Failed to delete note", error);
    }
  };

  const toggleModal = () => setIsCreateOpen((prev) => !prev);

  return (
    <>
      <div className="w-full min-h-dvh m-auto flex flex-col justify-start items-center">
        <Header toggleModal={toggleModal} />
        <h4 className="text-lg opacity-50 font-medium text-center select-none">
          {notes.length === 0 ? "Looks empty in here..." : null}
        </h4>

        <div className="w-full flex flex-col justify-center items-center gap-4 px-4 pt-2 pb-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="w-full md:w-3/4 min-h-16 flex justify-between items-start drop-shadow-md bg-memoir-dark text-memoir-light rounded-lg text-center brightness-100 text-lg p-4 cursor-pointer hover:brightness-125 hover:-translate-y-1 duration-200"
            >
              <h5 className="w-3/4 text-xl font-bold text-left break-words whitespace-normal">
                {note.title}
              </h5>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="memoir-note-btn"
                  onClick={() => deleteNote(note.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isCreateOpen && <NewNote addNote={addNote} closeModal={toggleModal} />}
      </div>
    </>
  );
};
