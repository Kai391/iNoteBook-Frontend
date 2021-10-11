import React, { useContext } from 'react'
import { context } from '../context/notes/State'
import Fetching from '../FetchIng';
import host from '../Hosting.js';

export default function AddingNote() {
    const notes = useContext(context);

    const bluringEnd = () => {
        document.getElementById("noteComponet").style.filter = "blur(0)"
    }

    // for add button in overflow div to add note to backend
    const AddBtn = () => {

        let noteTitle = document.getElementById("note-title").value;
        let desc = document.getElementById("floatingTextarea2").value;
        // console.log(notes.currentNote.title,notes.currentNote.description);
        notes.setCurrentNote({});
        let data = { title: noteTitle, description: desc };
        Fetching(`${host}/api/notes/new-note`, "POST", data, window.localStorage.getItem('authToken')).then(value => {
            // console.log(value)
            notes.setNotes([value, ...notes.notes]);
            notes.updateAlert("success", "Your note has been included!")
        });
        notes.noteAdding(1);
        bluringEnd();
    }

    // or add button in overflow div to cancel note to backend
    const cancelNote = () => {
        notes.noteAdding(1);
        bluringEnd();
    }

    const cancelUpdateNote = () => {
        notes.noteAdding(2);
        bluringEnd();
    }

    const handler = (e) => {
        if (e.target.id === "note-title")
            notes.setCurrentNote({ title: e.target.value, description:notes.currentNote.description ,noteid: notes.currentNote.noteid, arrayid: notes.currentNote.arrayid });
        else
            notes.setCurrentNote({title:notes.currentNote.title,description:e.target.value,noteid: notes.currentNote.noteid, arrayid: notes.currentNote.arrayid})
        // console.log(notes.currentNote);
    }

    const updateBtn = ()=>{
        // console.log("Updated data")
        let data = {title:notes.currentNote.title,description:notes.currentNote.description}
        Fetching(`${host}/api/notes/${notes.currentNote.noteid}/update`,"PUT",data,window.localStorage.getItem('authToken')).then(v=>{
            // console.log(v)
            // let newdata = {...v["Updated fields"],_id:v["old Data"]._id}
            // console.log(newdata)
            notes.setNotes(notes.notes.splice(Number(notes.currentNote.arrayid), 1,v["Updated fields"]))
            notes.setNotes(notes.notes)
            notes.updateAlert('success',"Your note has been updated!");
            notes.setCurrentNote({});
            // notes.setCurrentNote({title:v["Updated fields"].title,description:v["Updated fields"].description,noteid:v["old Data"]._id,arrayid:notes.currentNote.arrayid});
        })
        notes.noteAdding(2);
        bluringEnd()
        // console.log(notes.currentNote);
    }

    return (
        <div>
            {notes.addNote.addNoteContainer && <div className="container" style={{ position: "absolute", top: "27%" }}>
                {/* {<div className="container" style={{ position: "absolute", top: "27%" }}> */}
                <div className="card-body note-card-body">
                    <form>
                        <h2 className="text-center">ADD NOTE</h2>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="email" className="form-control" id="note-title" aria-describedby="emailHelp" placeholder="Add your Title" onChange={handler} />
                        </div>
                        <label htmlFor="desc" className="form-label">Description</label>
                        <div className="form-floating">
                            <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} onChange={handler}></textarea>
                        </div>
                        <div className="d-flex justify-content-between mt-3">

                            <button className="btn btn-primary" disabled={!notes.currentNote.title || !notes.currentNote.description} onClick={AddBtn}>Add</button>
                            <button className="btn btn-danger" onClick={cancelNote}>Cancel</button>
                        </div>
                    </form>

                </div>
            </div>}
            {notes.addNote.updateContainer && <div className="container" style={{ position: "absolute", top: "27%" }}>
                <div className="card-body note-card-body">
                    <form>
                        <h2 className="text-center">UPDATE NOTE</h2>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="email" className="form-control" value={notes.currentNote.title} id="note-title" aria-describedby="emailHelp" onChange={handler}/>
                        </div>
                        <label htmlFor="desc" className="form-label">Description</label>
                        <div className="form-floating">
                            <textarea className="form-control" value={notes.currentNote.description} id="floatingTextarea2" style={{ height: "100px" }} onChange={handler}></textarea>
                        </div>
                        <div className="d-flex justify-content-between mt-3">

                            <button className="btn btn-primary" disabled={!notes.currentNote.title || !notes.currentNote.description} onClick={updateBtn} >Update</button>
                            <button className="btn btn-danger" onClick={cancelUpdateNote}>Cancel</button>
                        </div>
                    </form>

                </div>
            </div>}
        </div>
    )
}
