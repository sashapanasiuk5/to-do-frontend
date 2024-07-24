import React from "react";
import { Task } from "../../models/Task";

import Edit from '../../icons/edit.svg';
import './ToDoListItem.css'
import useMobx from "../../stores/store";
 
interface Props{
    task: Task
}

export const getCardColor = (priority: number)=>{
    if(priority <= 2){
        return 'red'
    }
    if (priority <= 5) {
        return 'orange'
    }
    if (priority <= 8) {
        return 'yellow'
    } else {
        return 'green'
    } 
}

export function ToDoListItem ( { task }: Props){
    const {modalsStore, taskStore} = useMobx();

    const openTask = () => {
        taskStore.selectTask(task);
        modalsStore.OpenModal("openTaskModal")
    }

    return (
    <div className="todo-item" onClick={openTask}>
        <div className="item-header">
            <div className="title">{task.title}</div>
            <img className="edit-button" src={Edit} alt=""/>
        </div>

        <div className="description">{task.description}</div>
        <div className={"priority "+getCardColor(task.priority)}>
            <div>Priority</div>
            <span>{task.priority}</span>
        </div>
    </div>
    );
}
