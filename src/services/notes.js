import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const addNoteToFirestore = async (title, content = "") => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const notesRef = collection(db, "notes");
  const docRef = await addDoc(notesRef, {
    title,
    content,
    ownerId: user.uid,
  });

  return { id: docRef.id, title, content };
};

export const fetchNotesFromFirestore = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const notesRef = collection(db, "notes");

  const q = query(notesRef, where("ownerId", "==", user.uid));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content || "",
  }));
};

export const deleteNoteFromFirestore = async (id) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const noteRef = doc(db, "notes", id);
  const noteDoc = await getDoc(noteRef);

  if (noteDoc.exists() && noteDoc.data().ownerId === user.uid) {
    await deleteDoc(noteRef);
  } else {
    throw new Error("Unauthorized attempt to delete a note");
  }
};

export const saveNoteContent = async (noteId, title, content) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const noteRef = doc(db, "notes", noteId);
  const noteDoc = await getDoc(noteRef);

  if (noteDoc.exists() && noteDoc.data().ownerId === user.uid) {
    await updateDoc(noteRef, { title, content });
  } else {
    throw new Error("Unauthorized attempt to edit a note");
  }
};
