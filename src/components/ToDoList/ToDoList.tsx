import React, { ReactElement } from 'react';
import { Task } from './models/Task';
import { Status }  from './models/Status';
import ToDoListItem from '../ToDoListItem/ToDoListItem';

import '../../styles/ToDoList.css'
interface ToDoListState {
    tasks: Task[]
}
 
class ToDoList extends React.Component<{}, ToDoListState> {
    state = {
        tasks: [
            new Task('test', 'decsription', 1, new Status(1, 'To do', 'to-do')),
            new Task('test1', 'decsription1', 5, new Status(5, 'Done', 'done')),
            new Task('test2', 'decsription2', 1, new Status(5, 'Done', 'done')),
            new Task('test3', 'decsription3', 2, new Status(5, 'Done', 'done')),
        ]
    }

    GetTasksByStatus(status: string): ReactElement[]{
        return this.state.tasks.filter( task => task.status.slug === status).map(task => <ToDoListItem task={task}></ToDoListItem>)
    }
    render() { 
        return (
            <div className='list-wrapper'>
                <div className="column">
                    <div className="column-title">
                        To do
                    </div>
                    <div className="todos">
                        {this.GetTasksByStatus('to-do')}
                    </div>
                </div>
                <div className="column">
                    <div className="column-title">
                        In progress
                    </div>
                    <div className="todos">
                        {this.GetTasksByStatus('in-progress')}
                    </div>
                </div>
                <div className="column">
                    <div className="column-title">
                        Done
                    </div>
                    <div className="todos">
                        {this.GetTasksByStatus('done')}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ToDoList;