import React, { useState } from "react";
import { Task } from "../../models/Task";

import {ReactComponent as Open} from '../../icons/open.svg';
import './ToDoListItem.css'
import useMobx from "../../stores/store";
import { useDraggable, useSensor } from "@dnd-kit/core";


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

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const openTask = (e: React.MouseEvent) => {
        taskStore.selectTask(task);
        modalsStore.OpenModal("openTaskModal")
    }

    const trimmedDescription = () => {
        if(task.description.length > 150)
            return task.description.substring(0,150) + "..."
        return task.description
    }

    return (
    <div className="todo-item" ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div className="item-header">
            <div className="title">{task.title}</div>
            <Open className="edit-button" onClick={openTask}/>
        </div>

        <div className="description">{trimmedDescription()}</div>
        <div className={"priority "+getCardColor(task.priority)}>
            <div>Priority</div>
            <span>{task.priority}</span>
        </div>
    </div>
    );
}
