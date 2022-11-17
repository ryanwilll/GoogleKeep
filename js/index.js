//

const notesContainer = document.querySelector("#notes-container");
const notesInput = document.querySelector("#note-content");
const addNotesBtn = document.querySelector(".add-note");

//Function
function showNotes() {
  cleanNotes();
  getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content, note.fixed);

    notesContainer.appendChild(noteElement);
  });
}

function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function addNote() {
  const notes = getNotes();

  const noteObject = {
    id: generateId(),
    content: notesInput.value,
    fixed: false,
  };

  const noteElement = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);
  notes.push(noteObject);

  saveNotes(notes);

  notesInput.value = "";
}

function generateId() {
  return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
  const elements = document.createElement("div");
  elements.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto...";
  elements.appendChild(textarea);

  const pinIcon = document.createElement("i");
  pinIcon.classList.add(...["bi", "bi-pin"]);
  elements.appendChild(pinIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add(...["bi", "bi-x-lg"]);
  elements.appendChild(deleteIcon);

  const duplicateIcon = document.createElement("i");
  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);
  elements.appendChild(duplicateIcon);

  if (fixed) {
    elements.classList.add("fixed");
  }

  //Eventos do Elemento
  elements.querySelector(".bi-pin").addEventListener("click", () => {
    toogleFixNote(id);
  });

  elements.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNotes(id, elements);
  });

  elements
    .querySelector(".bi-file-earmark-plus")
    .addEventListener("click", () => {
      copyNote(id);
    });

  return elements;
}

function copyNote(id) {
  const notes = getNotes();

  const targetNote = notes.filter((notes) => notes.id === id)[0];

  const noteObject = {
    id: generateId(),
    content: targetNote.content,
    fixed: false,
  };

  const noteElement = createNote(
    noteObject.id,
    noteObject.content,
    noteObject.fixed
  );

  notesContainer.appendChild(noteElement);

  notes.push(noteObject);
  saveNotes(notes);
}

function deleteNotes(id, elements) {
  const notes = getNotes().filter((notes) => notes.id !== id);

  saveNotes(notes);

  notesContainer.removeChild(elements);
}

function toogleFixNote(id) {
  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.fixed = !targetNote.fixed;
  console.log(notes);
  saveNotes(notes);
  showNotes();
}

//Local Storage
function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const ordenadNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));
  return ordenadNotes;
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

//Events

addNotesBtn.addEventListener("click", () => addNote());

//Inicialização Auto

showNotes();
