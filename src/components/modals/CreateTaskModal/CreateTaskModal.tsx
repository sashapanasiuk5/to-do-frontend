import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal'


import { styles }  from '../../../styles/modal.styles'
import './CreateTaskModal.styles.css'
import useMobx from "../../../stores/store";
import { observer } from "mobx-react-lite";
import TaskDto from "../../../models/TaskDto";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Task } from "../../../models/Task";

function CreateTaskModal(){
    const { modalsStore, taskStore} = useMobx()

    const handleCloseModal = () =>{
        modalsStore.CloseModal('createTaskModal')
    }

    const handleCreate = async (dto: TaskDto) =>{
        await taskStore.createTask(dto);
        modalsStore.CloseModal('createTaskModal')
    }

    return (
        <Modal style={styles} isOpen={modalsStore.modalsState.createTaskModal.isOpen} onRequestClose={handleCloseModal}>
            <div className="CreateTaskModal">
                <div className="CreateTaskModalTitle">Create new task</div>
                <TaskForm taskForEditing={undefined} submitButtonName="Create" submitAction={handleCreate}></TaskForm>
            </div>
        </Modal>
    );
}
 
export default observer(CreateTaskModal);