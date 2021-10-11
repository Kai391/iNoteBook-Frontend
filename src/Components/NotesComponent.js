import React,{useContext} from 'react'
import NoteCard from './NoteCard';
import { context } from '../context/notes/State'


export default function NotesComponent() {
    const notes = useContext(context);

    const AddNoteButton = () => {
        notes.noteAdding(1);
        document.getElementById("noteComponet").style.filter="blur(4px)";
    }
    // console.log(notes.notes)

    return (
        <div id="noteComponet">
            <div className="container d-flex align-items-center justify-content-between">
                <h1>{notes.userName}'s Notes</h1>
                <i className="fas fa-plus fa-2x" onClick={AddNoteButton}></i>
            </div>
            {notes.notes && <div className="row">
                {notes.notes.length?notes.notes.map((e, i) => {
                    return (
                        <NoteCard elements={e} key={i} id={i} />
                    )
                }):<div style={{textAlign:"center",height:"75vh"}}><img  style={{marginTop:"90px"}} src="https://app.apextrading.com/img/misc/widget-no-item.svg"/></div>}
            </div>}
            
        </div>
    )
}
