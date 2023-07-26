import logo from './logo.svg';
import './App.css';
import React from "react";

import ToDoItem from './components/ToDoItem';
import { v4 as uuidv4 } from 'uuid';



function App() {

  const taskDescRef = React.useRef(null);
  const [savedTasks, setSavedTasks] = React.useState([]);
  const [taskCount, setTaskCount] = React.useState(0);

  let allTasks = JSON.parse(getTasksFromStorage());

  React.useEffect(() => {

    allTasks = JSON.parse(getTasksFromStorage());

    try {

      setTaskCount(allTasks.length)
      console.log(`task count set: ${taskCount}`);

    } catch (error) {

      setTaskCount(0)
      console.log("task count not set");

    }




  }, [savedTasks])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      let task = taskDescRef.current.value;
      addTask(task);
      taskDescRef.current.value = "";

    }
  };

  function addTask(task) {

    const taskObject = {

      key: uuidv4(),
      task: task

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



  }

  function getTasksFromStorage() {

    const retrievedTasksFromStorage = localStorage.getItem("tasks");
    console.log(`Whats in storage: ${retrievedTasksFromStorage}`);
    return retrievedTasksFromStorage;

  }



  return (
    <div className="App">

      <div className='hero-container'>

        <h1 className='hero-title'>Sunday, July 23</h1>

      </div>

      <div className='info-container'>

        <div className='info-title-container'>

          <h1 className='info-title'>To Do's</h1>
          <div className='info-counter-container'>

            <h1 className='info-counter'>{taskCount}</h1>


          </div>


        </div>

        <div className='info-nav-container'>

          <div className='info-nav-item info-nav-active-item'>Active</div>
          <div className='info-nav-item info-nav-completed-item'>Completed</div>


        </div>

      </div>

      <div className='add-todo-container'>

        <input className='add-todo-input' placeholder='Add a To do' ref={taskDescRef} onKeyDown={handleKeyPress} required />

      </div>

      <div className='to-do-list-container'>

        {allTasks && allTasks.map((task) => (

          <ToDoItem
            key={task.key}
            task={task.task}

          />

        ))}



      </div>

    </div>
  );
}

export default App;
