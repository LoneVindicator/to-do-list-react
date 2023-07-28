import logo from './logo.svg';
import './App.css';
import React from "react";
import noTasksFoundImg from "./images/robot.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaEllipsisV } from 'react-icons/fa';

import ToDoItem from './components/ToDoItem';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function App() {

  const notifyDelete = () =>

    toast.error('Task has been deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyEdit = () =>

    toast.success('Task has been edited', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyAdd = () =>

    toast.info('New task has been added', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyClearStorage = () =>

    toast.info('Storage has been cleared', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const taskDescRef = React.useRef(null);

  const [currentDate, setCurrentDate] = React.useState("Sunday, July 23");
  const [currentTime, setCurrentTime] = React.useState('');
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [showContextMenu, setShowContextMenu] = React.useState(false);

  const [savedTasks, setSavedTasks] = React.useState([]);
  const [taskCount, setTaskCount] = React.useState(0);
  const [isFiltered, setIsFiltered] = React.useState("all");
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  const [displayArray, setDisplayArray] = React.useState([]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  const handleContextMenuClose = () => {
    setShowContextMenu(false);
  };

  let allTasks = JSON.parse(getTasksFromStorage());

  React.useEffect(() => {

    if (isFiltered == "active" || isFiltered == "completed") {
      allTasks = filteredTasks;
      console.log(`whats in allTasks ${allTasks}`)
      console.log(`whats in isFiltered ${isFiltered}`)

    } else {

      allTasks = JSON.parse(getTasksFromStorage());
      console.log(`whats in allTasks ${allTasks}`)

    }

    setDisplayArray(allTasks);

    try {

      setTaskCount(allTasks.length)
      // console.log(`task count set: ${taskCount}`);

    } catch (error) {

      setTaskCount(0)
      // console.log("task count not set");

    }


    DateDisplay();

  }, [savedTasks, isFiltered])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      let task = taskDescRef.current.value;

      const isInputValid = validateInput(task);
      if (isInputValid == true) {

        addTask(task);

      }

      taskDescRef.current.value = "";

    }
  };

  function validateInput(text) {

    if (text.trim() === '') {
      alert('Input cannot be empty');
      return false;
    } else if (text.length < 3) {
      alert('Input must have at least 3 characters');
      return false;
    }

    return true;


  }

  function addTask(task) {

    const taskObject = {

      key: uuidv4(),
      task: task,
      active: true,
    }

    let retrievedTasks = JSON.parse(getTasksFromStorage());

    if (retrievedTasks === null) {

      retrievedTasks = [];
      console.log("array is empty! i.e. it is null")

    }

    const updatedTasks = [...retrievedTasks, taskObject]
    console.log(updatedTasks);



    localStorage.setItem("tasks", JSON.stringify(updatedTasks))


    console.log(`is parse working: ${updatedTasks}`)
    setSavedTasks(updatedTasks);

    notifyAdd();
    refreshFilteredPage();



  }



  function getTasksFromStorage() {

    const retrievedTasksFromStorage = localStorage.getItem("tasks");
    // console.log(`Whats in storage: ${retrievedTasksFromStorage}`);
    return retrievedTasksFromStorage;

  }

  function deleteTask(taskId) {

    let retrievedTasks = JSON.parse(getTasksFromStorage());

    let updatedTasks = retrievedTasks.filter((task) => task.key !== taskId);
    console.log(updatedTasks);

    if (updatedTasks == "") {

      updatedTasks = null;
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))


    console.log(`task id: ${taskId} has been deleted`)
    setSavedTasks(updatedTasks);

    notifyDelete();
    refreshFilteredPage();


  }

  function editTask(taskId, editedTask) {

    console.log(`task id: ${taskId} has been edited`)

    let retrievedTasks = JSON.parse(getTasksFromStorage());

    const updatedTasks = retrievedTasks.map((taskObj) => {
      if (taskObj.key === taskId) {
        // If it's the object to be edited, clone and update the 'task' property
        return { ...taskObj, task: editedTask };
      } else {
        // Otherwise, return the original object
        return taskObj;
      }
    });

    // Set the updated array to the state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))


    console.log(`editedTasks: ${updatedTasks}`)
    setSavedTasks(updatedTasks);

    notifyEdit();
    refreshFilteredPage();

  }

  function toggleStatus(taskId, status) {

    // console.log(`task id: ${taskId} has status change`)

    let retrievedTasks = JSON.parse(getTasksFromStorage());

    const updatedTasks = retrievedTasks.map((taskObj) => {
      if (taskObj.key === taskId) {
        // If it's the object to be edited, clone and update the 'task' property
        return { ...taskObj, active: status };
      } else {
        // Otherwise, return the original object
        return taskObj;
      }
    });

    // Set the updated array to the state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))


    // console.log(`updated status: ${JSON.stringify(updatedTasks)}`)
    setSavedTasks(updatedTasks);
    refreshFilteredPage();

  }

  const handleFilterTasks = (criteria) => () => {
    filterTasks(criteria);
  };

  const filterTasks = (criteria) => {

    let retrievedTasks = JSON.parse(getTasksFromStorage());
    let updatedTasks;

    if (retrievedTasks === null) {

      retrievedTasks = [];
      console.log("array is empty! i.e. it is null")

    }

    if (criteria == "all") {

      updatedTasks = retrievedTasks;
      setIsFiltered(criteria);
      console.log(`filtered by active-${criteria}: ${updatedTasks}`);
      console.log("filter is on all")


    } else {

      updatedTasks = retrievedTasks.filter((task) => task.active == criteria);
      console.log(`filtered by active-${criteria}: ${updatedTasks}`);

      if (updatedTasks == "") {

        updatedTasks = null;
      }

      if (criteria == true) {

        setIsFiltered("active");

        console.log("filter is on active")


      } else {

        setIsFiltered("completed");

        console.log("filter is on completed")


      }




    }

    allTasks = updatedTasks;
    setFilteredTasks(updatedTasks);

  };

  function refreshFilteredPage() {

    if (isFiltered == "active") {

      filterTasks(true);


    } else if (isFiltered == "completed") {

      filterTasks(false);
    }
  }

  function clearStorage() {

    let updatedTasks = [];
    

    localStorage.clear();
    handleContextMenuClose();
    notifyClearStorage();
    refreshFilteredPage();
    setSavedTasks(updatedTasks)


  }



  const DateDisplay = () => {

    // Create a new Date object with the current date and time
    const date = new Date();

    // Define options for the toLocaleString method for date and time
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };

    // Format the date and time using toLocaleString with the defined options
    const formattedDate = date.toLocaleString('en-US', dateOptions);
    const formattedTime = date.toLocaleString('en-US', timeOptions);

    setCurrentDate(`${formattedDate}`);
    setCurrentTime(`${formattedTime}`);


  };





  return (
    <div className="App" >

      <ToastContainer />

      <div className='hero-container' onMouseEnter={handleContextMenu} onMouseLeave={handleContextMenuClose}>

        <div className='hero-text-container'>

          <h1 className='hero-title'>{currentDate}</h1>
          <p className='hero-sub-title'>{currentTime}</p>

        </div>

        {showContextMenu && (
          <Dropdown>
            {/* Custom kebab menu as the Dropdown.Toggle */}
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaEllipsisV />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" id='dropdown-item-clear-storage' onClick={clearStorage}>Clear Storage</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        )}


      </div>

      <div className='info-container'>

        <div className='info-title-container'>

          <h1 className='info-title'>To Do's</h1>
          <div className='info-counter-container'>

            <h1 className='info-counter'>{taskCount}</h1>


          </div>


        </div>

        <Navbar bg="dark" data-bs-theme="dark">
          <Container>

            <Nav className="me-auto info-nav-container">
              <Nav.Link href="#" className='info-nav-item info-nav-completed-item' onClick={handleFilterTasks("all")}>Home</Nav.Link>
              <Nav.Link href="#" className='info-nav-item info-nav-active-item' onClick={handleFilterTasks(true)} >Active</Nav.Link>
              <Nav.Link href="#" className='info-nav-item info-nav-completed-item' onClick={handleFilterTasks(false)}>Completed</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

      </div>

      <div className='add-todo-container'>

        <input className='add-todo-input' placeholder='Add a To do' ref={taskDescRef} onKeyDown={handleKeyPress} required />

      </div>

      <div className='to-do-list-container' ref={parent}>

        {displayArray && displayArray.reverse().map((task) => (

          <ToDoItem
            key={task.key}
            id={task.key}
            task={task.task}
            status={task.active}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleStatus={toggleStatus}
            validateInput={validateInput}
            handleKeyPress={handleKeyPress}

          />

        ))}

        {!displayArray &&

          <div className='no-task-container'>



            <h1>No tasks found!</h1>
            <img src={noTasksFoundImg} className='no-task-img'></img>
            <p>Trying adding some above</p>

          </div>

        }

      </div>

    </div>
  );
}

export default App;
