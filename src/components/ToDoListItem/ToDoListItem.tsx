import React from "react";
import { Task } from "../ToDoList/models/Task";

import Edit from '../../icons/edit.svg';
import '../../styles/ToDoListItem.css'
 
interface Props{
    task: Task
}

function ToDoListItem ( { task }: Props){
     
    return (
    <div className="todo-item">
        <div className="item-header">
            <div className="title">{task.name}</div>
            <img className="edit-button" src={Edit} alt=""/>
        </div>

        <div className="description">{task.description}</div>
        <div className="priority">
            <div>Priority</div>
            <span>{task.priority}</span>
        </div>
    </div>
    );
}
 
export default ToDoListItem;