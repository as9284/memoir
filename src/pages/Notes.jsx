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
    await deleteNoteFromFirestore(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const toggleModal = () => setIsCreateOpen((prev) => !prev);

  return (
    <>
      <div className="w-full min-h-dvh m-auto flex flex-col justify-start items-center">
        <Header toggleModal={toggleModal} />
        <h4 className="text-lg opacity-50 font-medium text-center select-none">
          {notes.length === 0 ? "Looks empty in here..." : null}
        </h4>

        <div className="w-full flex flex-col justify-center items-center gap-4 px-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="relative w-full h-16 flex justify-center items-center drop-shadow-md bg-memoir-dark text-memoir-light rounded-lg text-center brightness-100 text-lg p-4 cursor-pointer hover:brightness-125 duration-200"
            >
              <h5 className="absolute text-xl font-bold left-4">
                {note.title}
              </h5>
              <div className="absolute right-4 flex justify-center items-center gap-2">
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
