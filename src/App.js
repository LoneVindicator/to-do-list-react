import logo from './logo.svg';
import './App.css';
import React from "react";

import ToDoItem from './components/ToDoItem';



function App() {

  const taskDescRef = React.useRef(null);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {

      let taskDesc = taskDescRef.current.value;

      console.log(taskDesc);
      storeTask(taskDesc);
      taskDescRef.current.value = "";

    }
  };

  function storeTask(taskDesc) {

    let task = {

      key: 1,
      task: taskDesc,
    }

    localStorage.setItem("tasks", JSON.stringify(task));
    console.log(`saved task to local storage ${taskDesc}`);
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

            <h1 className='info-counter'>21</h1>


          </div>


        </div>

        <div className='info-nav-container'>

          <div className='info-nav-item info-nav-active-item'>Active</div>
          <div className='info-nav-item info-nav-completed-item'>Completed</div>


        </div>

      </div>

      <div className='add-todo-container'>

        <input className='add-todo-input' placeholder='Add a To do' ref={taskDescRef} onKeyDown={handleKeyPress}></input>

      </div>

      <div className='to-do-list-container'>

        <ToDoItem />
        <ToDoItem />
        <ToDoItem />


      </div>

    </div>
  );
}

export default App;
