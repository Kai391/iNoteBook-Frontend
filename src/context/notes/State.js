import { useState, createContext } from "react";
// import NotesContext from "./NotesContext";

const context = createContext();
const NoteState = (props) => {

    // <------------------------ for Alert mssgs ---------------------------->
    const [alert, setAlert] = useState({ tag: null, msg: null })
    const updateAlert = (tag, msg) => {
        setAlert({ tag: tag, msg: msg });
        setTimeout(() => {
            setAlert({ tag: null, msg: null });
        }, 2000);
    }
    const [isLogin, setIsLogin] = useState({
        login: false,
        homeAlert: 0
    })
    // <-------------------------- For Note----------------------------------->
    const [notes, setNotes] = useState(null);
    const [addNote, setAddNote] = useState({
        addNoteContainer: false,
        updateContainer: false
    })

    // <-----------------------for hovering div for add and update card-------------------->
    const noteAdding = (func) => {
        if (func === 1) {
            if (!addNote.addNoteContainer)
                setAddNote({ ...addNote, addNoteContainer: true });
            else
                setAddNote({ ...addNote, addNoteContainer: false })
        }
        else if (func === 2) {
            if (!addNote.updateContainer)
                setAddNote({ ...addNote, updateContainer: true })
            else
                setAddNote({ ...addNote, updateContainer: false });

        }
    }

    // <-------------------------stroring current note data ------------------------------->
const [currentNote, setCurrentNote] = useState({});


    // <------------------------------user name------------------------------->
    const [userName, setUserName] = useState(null);


    return (
        <context.Provider value={{ alert, updateAlert, notes, setNotes, isLogin, setIsLogin, addNote, noteAdding, userName, setUserName,currentNote,setCurrentNote}}>
            {props.children}
        </context.Provider>
    )
}

export default NoteState;
export { context };