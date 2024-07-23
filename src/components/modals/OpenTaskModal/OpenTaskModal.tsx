import * as React from 'react';
import { FunctionComponent } from 'react';
import Modal from 'react-modal'

import { styles }  from '../../../styles/modal.styles'
import { Task } from '../../../models/Task';
import TaskDto from '../../../models/TaskDto';
import useMobx from '../../../stores/store';
import { TaskForm } from '../../TaskForm/TaskForm';


import './OpenTaskModal.styles.css'
import { observer } from 'mobx-react-lite';

 
const OpenTaskModal: FunctionComponent = () => {
    const { modalsStore, taskStore} = useMobx()

    const handleCloseModal = () =>{
        modalsStore.CloseModal('openTaskModal')
        taskStore.deselectTask()
    }

    return (
        <Modal style={styles} isOpen={modalsStore.modalsState.openTaskModal.isOpen} onRequestClose={handleCloseModal}>
            <div className="OpenTaskModal">
                <div className="OpenTaskModalTitle">{taskStore.selectedTask != null ? taskStore.selectedTask.title : ''}</div>
                <div className="OpenTaskModalTags">
                    <div className="OpenTaskModalStatus">{taskStore.selectedTask != null ? taskStore.selectedTask.status.name : ''}</div>
                    <div className="OpenTaskModalPriority">Priority<span>{taskStore.selectedTask != null ? taskStore.selectedTask.priority : ''}</span></div>
                </div> 
                <div className="OpenTaskModalDescription">{taskStore.selectedTask != null ? taskStore.selectedTask.description : ''}</div>
                <div className="OpenTaskModalButtons">
                    <button className='OpenTaskModalButton edit'>Edit</button>
                    <button className='OpenTaskModalButton delete'>Delete</button>
                </div>
            </div>
        </Modal>
    );
}
 
export default observer(OpenTaskModal);