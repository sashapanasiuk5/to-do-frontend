import React from "react";
import { Task } from "../ToDoList/models/Task";
interface Props {
    task: Task
}
 
 
class ToDoListItem extends React.Component<Props, {}> {
    render() { 
        return (
        <div>
            <div className="title">{this.props.task.name}</div>
            <div className="description">{this.props.task.description}</div>
            <div className="status">{this.props.task.status.name}</div>
        </div>
        );
    }
}
 
export default ToDoListItem;