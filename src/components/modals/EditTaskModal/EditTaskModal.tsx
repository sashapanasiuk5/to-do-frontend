import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal'


import { styles }  from '../../../styles/modal.styles'
import './EditTaskModal.styles.css'
import useMobx from "../../../stores/store";
import { observer } from "mobx-react-lite";
import TaskDto from "../../../models/TaskDto";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Task } from "../../../models/Task";

function EditTaskModal(){
    const { modalsStore, taskStore} = useMobx()

    const handleCloseModal = () =>{
        modalsStore.CloseModal('editTaskModal')
    }

    const handleUpdate = async (dto: TaskDto) =>{
        await taskStore.updateTask(taskStore.selectedTask!, dto);
        modalsStore.CloseModal('editTaskModal')
    }
    const getModel = (): TaskDto | undefined =>{
        if(taskStore.selectedTask === undefined)
            return undefined;
        return {
            title: taskStore.selectedTask.title,
            description: taskStore.selectedTask.description,
            priority: taskStore.selectedTask.priority,
            statusId: taskStore.selectedTask.status.id
        };
    }

    return (
        <Modal style={styles} isOpen={modalsStore.modalsState.editTaskModal.isOpen} onRequestClose={handleCloseModal}>
            <div className="EditTaskModal">
                <div className="EditTaskModalTitle">Update task</div>
                <TaskForm taskForEditing={getModel()} submitButtonName="Save" submitAction={handleUpdate}></TaskForm>
            </div>
        </Modal>
    );
}
 
export default observer(EditTaskModal);