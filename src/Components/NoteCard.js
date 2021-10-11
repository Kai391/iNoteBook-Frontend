import React, { useContext } from 'react'
import { context } from '../context/notes/State';
import Fetching from '../FetchIng';
import host from '../Hosting.js';

export default function NoteCard(props) {
    const { title, description, _id } = props.elements;
    const notes = useContext(context);

    const deleteNote = (e) => {
        // console.log(e.target.dataset.noteid);

        Fetching(`${host}/api/notes/${e.target.dataset.noteid}/delete`, "DELETE", null, window.localStorage.getItem('authToken')).then(res => {
            // console.log(res);
            if (!res.err) {
                notes.setNotes(notes.notes.splice(Number(e.target.dataset.arrayid), 1))
                notes.setNotes(notes.notes)
                notes.updateAlert("success", "Your Note has been deleted!")
            }
            else
                notes.updateAlert("danger", res.err);
        });
    }

    const updateCard = (e) => {
        let a = document.getElementById(e.target.dataset.arrayid);
        let tytl = a.getElementsByClassName('card-title')[0].innerText;
        let desc = a.getElementsByClassName('card-text')[0].innerText;
        // console.log(tytl,desc,e.target.dataset.noteid);
        notes.setCurrentNote({title:tytl,description:desc,noteid:e.target.dataset.noteid,arrayid:e.target.dataset.arrayid});

        notes.noteAdding(2);
        document.getElementById("noteComponet").style.filter = "blur(4px)";
    }

    return (
        <div className="col-sm-4 my-3" id={String(props.id)}>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{title}</h5>
                        <div className="d-flex">
                            <i className="fas fa-marker mx-2" onClick={updateCard} data-arrayid={String(props.id)} data-noteid={_id} ></i>
                            <i className="far fa-trash-alt mx-2" onClick={deleteNote} data-noteid={_id} data-arrayid={String(props.id)}></i>
                        </div>

                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}
