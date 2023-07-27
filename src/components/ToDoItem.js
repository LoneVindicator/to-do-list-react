import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import MovieModal from "./MovieModal";
import { FaCheck, FaEllipsisV } from 'react-icons/fa'; // Import the kebab menu icon from font-awesome (or any other icon library)
import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

export default function ToDoItem(props) {
    const [showContextMenu, setShowContextMenu] = useState(false);

    const [isActive, setIsActive] = useState(props.status);
    const isActiveRef = React.useRef(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        handleContextMenuClose();
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }


    React.useEffect(() => {

        // console.log(`Marker Color BEFORE: ${isActiveRef.current.style.backgroundColor}`)

        if (isActive === true) { //if task is ongoing

            isActiveRef.current.style.backgroundColor = "#BE4040";

        } else { //if task has been completed

            isActiveRef.current.style.backgroundColor = "#669BBC";


        }

        // console.log(`Marker Color AFTER: isActive = ${isActiveRef.current.style.backgroundColor}`)



    }, [isActive])

    const handleContextMenu = (e) => {
        e.preventDefault();
        setShowContextMenu(true);
    };

    const handleContextMenuClose = () => {
        setShowContextMenu(false);
    };

    const handleEditTask = (editText) => {
        props.editTask(props.id, editText);
        handleContextMenuClose();
        toggleModal();
    };

    const handleDeleteTask = () => {
        props.deleteTask(props.id);
        handleContextMenuClose();

    };

    const handleToggleStatus = () => {

        let status = isActive;

        console.log(`handleToggleStatus BEFORE: ${status}`);

        status = !isActive;

        props.toggleStatus(props.id, status);


        console.log(`handleToggleStatus AFTER: ${status}`);

        setIsActive(status);

    };




    return (
        <div
            className="to-do-item-container"
            onMouseEnter={handleContextMenu}
            onMouseLeave={handleContextMenuClose}
        >



            <div className="marker-task-container">

                <div className="to-do-checkbox-container" onClick={handleToggleStatus} ref={isActiveRef}>
                    <div className="to-do-img-container">

                        {!isActive && <FaCheck />}

                    </div>
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
                        <Dropdown.Item href="#/action-1" onClick={toggleModal}><FaPen /> Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" id="dropdown-item-delete" onClick={handleDeleteTask}><FaTrash /> Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleEditTask={handleEditTask} {...props} />

            }


        </div>
    );
}
