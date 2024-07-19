import React from "react";
import { Task } from "../ToDoList/models/Task";

import Edit from '../../icons/edit.svg';
import '../../styles/ToDoListItem.css'
interface Props {
    task: Task
}
 
 
class ToDoListItem extends React.Component<Props, {}> {
    render() { 
        return (
        <div className="todo-item">
            <div className="item-header">
                <div className="title">{this.props.task.name}</div>
                <img className="edit-button" src={Edit} alt=""/>
            </div>

            <div className="description">{this.props.task.description}</div>
            <div className="priority">
                <div>Priority</div>
                <span>{this.props.task.priority}</span>
            </div>
        </div>
        );
    }
}
 
export default ToDoListItem;