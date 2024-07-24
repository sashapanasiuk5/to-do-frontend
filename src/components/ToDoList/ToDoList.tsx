import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Task } from '../../models/Task';
import { Status }  from '../../models/Status';
import { ToDoListItem}  from '../ToDoListItem/ToDoListItem';

import './ToDoList.css'
import { observer } from 'mobx-react-lite';
import useMobx from '../../stores/store';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';


function ToDoList(){
    const { taskStore, modalsStore} = useMobx();
    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint:{
            distance: 10
          }
        }),
      );
      
    useEffect(()=> {
        taskStore.fetchStatusesAsync()
        taskStore.fetchTasksAsync()
    }, [taskStore])

    const GetTasksByStatus = (status: string): ReactElement[] => {
        return taskStore.tasks
            .filter( task => task.status.slug === status)
            .sort( (taskA, taskB) => taskA.priority - taskB.priority)
            .map(task => <ToDoListItem task={task}></ToDoListItem>)
    }

    const handleAddButtonClick = () =>{
        modalsStore.OpenModal('createTaskModal')
    }
    
    return (
        <DndContext sensors={sensors}>
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
                <button className='ToDoListAddButton' onClick={handleAddButtonClick}></button>
            </div>
        </DndContext>
    );
}
 
export default observer(ToDoList);