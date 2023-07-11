import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const NotePage = () => {
    let navigate = useNavigate();
    let { noteId } = useParams();
    let [note, setNotes]  = useState(null);

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        let response = await fetch(`http://localhost:8000/api/notes/${noteId}`)
        let data = await response.json()
        setNotes(data)
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

    let handleSubmit = () => {
        updateNote()
        navigate('/')
    }


    return (
        <div className="note">
            <div className="note-header">
                <h3 onClick={handleSubmit}>⬅</h3>
            </div>
            <textarea onChange={(e) => {setNotes({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    );
}

export default NotePage;
