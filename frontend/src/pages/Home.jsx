import { useState, useEffect } from "react";
import Note from "../components/Notes";
import api from "../api";
import "../styles/home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Delete!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("Failed to create NOte");
        getNotes();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
      </div>
      <h2>Create a Note</h2>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Home;
