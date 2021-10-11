import React, { useContext, useEffect } from 'react'
import Fetching from '../FetchIng';
import { context } from '../context/notes/State'

import Alert from './Alert';
import { useHistory } from 'react-router';
import NotesComponent from './NotesComponent';
import AddingNote from './AddingNote';
import host from '../Hosting.js';

export default function Home() {
    let history = useHistory();
    const notes = useContext(context);
    // console.log("NoteContext ",notes)
    let token = window.localStorage.getItem('authToken');

    useEffect(() => {
        Fetching(`${host}/api/notes`, "GET", null, token).then(nts => {
            if (!nts.err) {
                if (!notes.isLogin.homeAlert) {
                    notes.setNotes(nts[0].reverse());
                    notes.updateAlert("success", "Welcome Sir!")
                    notes.setIsLogin({ login: true, homeAlert: 1 })
                    notes.setUserName(nts[1].fullName);
                }
            }
            else {
                history.push('/welcome');
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <Alert />
            <NotesComponent/>
            <AddingNote/>
        </>
    )
}
