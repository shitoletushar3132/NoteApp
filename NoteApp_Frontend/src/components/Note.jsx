import React, { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { NotesContext } from "../context/NotesContext";

const Note = ({ id, note }) => {
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);

  const { deleteNote, editNote } = useContext(NotesContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    editNote(id, content);
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
  };

  // Function to convert URLs to clickable links with blue color
  const convertToLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlPattern,
      (url) =>
        `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`
    );
  };

  const convertToStyledText = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(/_(.*?)_/g, "<i>$1</i>");
    return text;
  };

  const renderContent = (text) => {
    let styledText = convertToStyledText(text);
    styledText = convertToLinks(styledText);
    return { __html: styledText };
  };

  return (
    <div className="m-2">
      <div className={`h-72 w-72 bg-yellow-50 relative shadow-md rounded-md`}>
        <div className="flex justify-between p-2 px-4">
          <div className="text-sm text-slate-600">{note.date}</div>
          <div className="flex gap-4 text-slate-600">
            <button
              className="rounded-sm hover:bg-green-400 px-1 hover:text-black hover:scale-110"
              onClick={handleEdit}
            >
              <FiEdit size={18} />
            </button>
            <button
              className="rounded-sm hover:bg-red-500 hover:text-black hover:scale-110"
              onClick={() => handleDelete(id)}
            >
              <MdOutlineDelete size={22} />
            </button>
          </div>
        </div>
        <div className="p-1.5 overflow-y-scroll max-h-56 h-56">
          {isEditing ? (
            <textarea
              className="w-full h-full p-2 border border-gray-300 rounded-md resize-none"
              value={content}
              onChange={handleContentChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            // Render content as HTML with links and styles
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={renderContent(content)}
            ></div>
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-sm text-slate-600">
          {note.time}
        </div>
      </div>
    </div>
  );
};

export default Note;
