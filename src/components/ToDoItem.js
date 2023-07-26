import React from "react";

export default function ToDoItem(props) {

    return (

        <div className="to-do-item-container">

            <div className="to-do-checkbox-container">

                <div className="to-do-img-container"></div>


            </div>

            <div className="to-do-text-container">

                <p className="to-do-text">{props.task}</p>
            </div>

        </div>


    )
}