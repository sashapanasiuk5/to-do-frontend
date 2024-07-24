import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Task } from '../../models/Task';
import { Status }  from '../../models/Status';
import { ToDoListItem}  from '../ToDoListItem/ToDoListItem';

import './ToDoList.css'
import { observer } from 'mobx-react-lite';
import useMobx from '../../stores/store';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import TaskColumn from '../TaskColumn/TaskColumn';


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



    const handleAddButtonClick = () =>{
        modalsStore.OpenModal('createTaskModal')
    }

    const handleDragEvent = (e: DragEndEvent) =>{
        if(e.over != null){
            let statusSlug = e.over.id;
            let taskId = e.active.id;
            let task = taskStore.tasks.find(t => t.id == taskId)
            let status = taskStore.statuses.find(s => s.slug == statusSlug)
            if(task != undefined && status != undefined){
                taskStore.changeTaskStatus(task, status)
            }
        }
    }
    
    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEvent}>
            <div className="ToDoListWrapper">
                <div className='list-wrapper'>
                    {taskStore.statuses.map(st => <TaskColumn key={st.id} name={st.name} statusType={st.slug} />)}
                </div>
                <button className='ToDoListAddButton' onClick={handleAddButtonClick}></button>
            </div>
        </DndContext>
    );
}
 
export default observer(ToDoList);