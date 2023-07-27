import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function MovieModal(props) {
    console.log("MovieModal has been opened");

    const [editText, setEditText] = useState('');

    const handleInputChange = (e) => {
        setEditText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isInputValid = props.validateInput(editText);
        if (isInputValid === true) {
            props.handleEditTask(editText);
        }
    };

    return ReactDOM.createPortal(
        <div className="movie-modal-overlay" onClick={props.toggleModal}>
            <div className="movie-modal-content" onClick={(e) => e.stopPropagation()}>
                <form className="movie-modal-submi-form" onSubmit={handleSubmit}>
                    <div className='add-todo-modal-container'>
                        <input
                            className='add-todo-modal-input'
                            placeholder='Edit To do'
                            value={editText}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit" className='btn edit-modal-submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("portal")
    );
}
