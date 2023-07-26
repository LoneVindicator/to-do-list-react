import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaEllipsisV } from 'react-icons/fa'; // Import the kebab menu icon from font-awesome (or any other icon library)
import { FaTrash } from 'react-icons/fa'; 
import { FaPen } from 'react-icons/fa'; 


export default function ToDoItem(props) {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowContextMenu(true);
    };

    const handleContextMenuClose = () => {
        setShowContextMenu(false);
    };

    const handleEditTask = () => {
        let editedTask = "new task";
        props.editTask(props.id, editedTask);
        handleContextMenuClose();
    };

    const handleDeleteTask = () => {
        props.deleteTask(props.id);
        handleContextMenuClose();
    };


    return (
        <div
            className="to-do-item-container"
            onMouseEnter={handleContextMenu}
            onMouseLeave={handleContextMenuClose}
        >

            <div className="marker-task-container">

            <div className="to-do-checkbox-container">
                <div className="to-do-img-container"></div>
            </div>

            <div className="to-do-text-container">
                <p className="to-do-text">{props.task}</p>
            </div>

                
            </div>


            {showContextMenu && (
                <Dropdown>
                    {/* Custom kebab menu as the Dropdown.Toggle */}
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FaEllipsisV />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1" onClick={handleEditTask}><FaPen /> Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="dropdown-item-delete" onClick={handleDeleteTask}><FaTrash /> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}

            
        </div>
    );
}
