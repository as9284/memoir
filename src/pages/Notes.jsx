import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { NewNote } from "../components/NewNote";
import { MdDelete } from "react-icons/md";
import { Confirmation } from "../components/Confirmation";
import {
  addNoteToFirestore,
  fetchNotesFromFirestore,
  deleteNoteFromFirestore,
} from "../services/notes";
import { ExpandedNote } from "../components/ExpandedNote";
import { FaArrowUp } from "react-icons/fa";
import { Settings } from "../components/Settings";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState("light");

  const toggleDarkMode = (mode) => {
    setDarkMode(mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode("light");
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await fetchNotesFromFirestore();
      setNotes(fetchedNotes);
      setFilteredNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const refreshNotes = async () => {
    const fetchedNotes = await fetchNotesFromFirestore();
    setNotes(fetchedNotes);
    filterNotes(searchQuery, fetchedNotes);
  };

  const addNote = async (title) => {
    if (title.trim()) {
      const newNote = await addNoteToFirestore(title);
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      filterNotes(searchQuery, updatedNotes);
    }
  };

  const confirmDelete = (id) => {
    setIsConfirmOpen(true);
    setNoteToDelete(id);
  };

  const deleteNote = async () => {
    const id = noteToDelete;

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setFilteredNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setIsConfirmOpen(false);

    try {
      await deleteNoteFromFirestore(id);
    } catch (error) {
      const restoredNote = notes.find((note) => note.id === id);
      setNotes((prevNotes) => [...prevNotes, restoredNote]);
      setFilteredNotes((prevNotes) => [...prevNotes, restoredNote]);
      console.error("Failed to delete note", error);
    }
  };

  const toggleModal = () => setIsCreateOpen((prev) => !prev);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const expandNote = (note) => {
    setSelectedNote(note);
    setIsExpanded(true);
  };

  const filterNotes = (query, sourceNotes = notes) => {
    if (query.trim() === "") {
      setFilteredNotes(sourceNotes);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredNotes(
        sourceNotes.filter((note) =>
          note.title.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const timeoutId = setTimeout(() => {
      filterNotes(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const sortedNotes = filteredNotes.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <>
      <div className="w-full min-h-dvh m-auto flex flex-col justify-start items-center">
        <Header toggleModal={toggleModal} toggleSettings={toggleSettings} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes..."
          className="w-3/4 md:w-1/2 p-3 indent-2 bg-memoir-light drop-shadow-md mb-4 text-memoir-dark rounded-lg placeholder:text-neutral-400 dark:bg-memoir-dark dark:text-memoir-light"
        />
        <h4 className="text-lg text-memoir-dark/40 font-medium text-center select-none mt-2">
          {notes.length === 0 ? "Looks empty in here..." : null}
        </h4>

        <div className="w-full flex flex-col justify-center items-center gap-4 px-4 pt-2 pb-4">
          {sortedNotes.map((note) => (
            <div
              onClick={() => expandNote(note)}
              key={note.id}
              className="w-full md:w-3/4 min-h-16 flex justify-between items-start drop-shadow-md bg-memoir-dark text-memoir-light rounded-lg text-center brightness-100 text-lg p-4 cursor-pointer hover:brightness-125 hover:-translate-y-1 duration-200"
            >
              <h5 className="w-3/4 text-xl font-bold text-left break-words whitespace-normal">
                {note.title}
              </h5>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="memoir-note-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(note.id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isCreateOpen && <NewNote addNote={addNote} closeModal={toggleModal} />}
        {isExpanded && selectedNote && (
          <ExpandedNote
            title={selectedNote.title}
            closeModal={() => setIsExpanded(false)}
            noteId={selectedNote.id}
            refreshNotes={refreshNotes}
          />
        )}

        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 md:right-4 bg-memoir-light text-memoir-dark p-4 rounded-full drop-shadow-lg hover:brightness-110 hover:-translate-y-1 duration-200 z-10"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}

        {isConfirmOpen && (
          <Confirmation
            onConfirm={deleteNote}
            onCancel={() => setIsConfirmOpen(false)}
          />
        )}

        {isSettingsOpen && (
          <Settings
            closeModal={toggleSettings}
            setMode={toggleDarkMode}
            currentMode={darkMode}
          />
        )}
      </div>
    </>
  );
};
