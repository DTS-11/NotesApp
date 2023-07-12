import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const NotePage = () => {
    let navigate = useNavigate();
    let { noteId } = useParams();
    let [note, setNotes]  = useState(null);

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if (noteId === 'new') return

        let response = await fetch(`http://localhost:8000/api/notes/${noteId}`)
        let data = await response.json()
        setNotes(data)
    }

    let createNote = async () => {
        fetch(`http://localhost:8000/api/notes/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId == 'new' && note.body !== null) {
            createNote()
        }
        navigate('/')
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3 onClick={handleSubmit}>⬅</h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Save</button>
                )}
                
            </div>
            <textarea onChange={(e) => { setNotes({...note, 'body':e.target.value}) }} value={note?.body}></textarea>
        </div>
    );
}

export default NotePage;
