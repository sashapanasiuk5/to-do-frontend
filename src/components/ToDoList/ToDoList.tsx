import React, { ReactElement } from 'react';
import { Task } from './models/Task';
import { Status }  from './models/Status';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
interface ToDoListState {
    tasks: Task[]
}
 
class ToDoList extends React.Component<{}, ToDoListState> {
    state = {
        tasks: [
            new Task('test', 'decsription', new Status(1, 'To do', 'to-do')),
            new Task('test1', 'decsription1', new Status(5, 'Done', 'done')),
            new Task('test2', 'decsription2', new Status(5, 'Done', 'done')),
            new Task('test3', 'decsription3', new Status(5, 'Done', 'done')),
        ]
    }

    GetTasksByStatus(status: string): ReactElement[]{
        return this.state.tasks.filter( task => task.status.slug === status).map(task => <ToDoListItem task={task}></ToDoListItem>)
    }
    render() { 
        return (
            <div className='list-wrapper'>
                <div className="column">
                    {this.GetTasksByStatus('to-do')}
                </div>
                <div className="column">
                    {this.GetTasksByStatus('in-progress')}
                </div>
                <div className="column">
                    {this.GetTasksByStatus('done')}
                </div>
            </div>
        );
    }
}
 
export default ToDoList;