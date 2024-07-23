import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Task } from '../../models/Task';
import { Status }  from '../../models/Status';
import ToDoListItem from '../ToDoListItem/ToDoListItem';

import './ToDoList.css'
import { observer } from 'mobx-react-lite';
import useMobx from '../../stores/store';
import CreateTaskModal from '../modals/CreateTaskModal/CreateTaskModal';
import OpenTaskModal from '../modals/OpenTaskModal/OpenTaskModal';
import EditTaskModal from '../modals/EditTaskModal/EditTaskModal';
import ConfirmationModal from '../modals/ConfrmationModal/ConfirmationModal';


function ToDoList(){
    const { taskStore, modalsStore} = useMobx();

    useEffect(()=> {
        taskStore.fetchStatusesAsync()
        taskStore.fetchTasksAsync()
    }, [taskStore])

    const GetTasksByStatus = (status: string): ReactElement[] => {
        return taskStore.tasks.filter( task => task.status.slug === status).map(task => <ToDoListItem task={task}></ToDoListItem>)
    }

    const handleAddButtonClick = () =>{
        modalsStore.OpenModal('createTaskModal')
    }
    
    return (
        <div className="ToDoListWrapper">
            <div className='list-wrapper'>
                <div className="column">
                    <div className="column-title">
                        To do
                    </div>
                    <div className="todos">
                        {GetTasksByStatus('to-do')}
                    </div>
                </div>
                <div className="column">
                    <div className="column-title">
                        In progress
                    </div>
                    <div className="todos">
                        {GetTasksByStatus('in-progress')}
                    </div>
                </div>
                <div className="column">
                    <div className="column-title">
                        Done
                    </div>
                    <div className="todos">
                        {GetTasksByStatus('done')}
                    </div>
                </div>
            </div>
            <CreateTaskModal/>
            <OpenTaskModal/>
            <EditTaskModal/>
            <button className='ToDoListAddButton' onClick={handleAddButtonClick}></button>
        </div>
    );
}
 
export default observer(ToDoList);