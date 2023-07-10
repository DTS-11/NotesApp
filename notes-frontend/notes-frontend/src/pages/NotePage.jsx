import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const NotePage = () => {
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


    return (
        <div>
            <p>{note?.body}</p>
        </div>
    );
}

export default NotePage;
