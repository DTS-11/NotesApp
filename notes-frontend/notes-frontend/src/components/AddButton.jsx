import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = () => {
  return (
    <Link to={'/note/new'} className="floating-button">
        &#65291;
    </Link>
  )
}

export default AddButton