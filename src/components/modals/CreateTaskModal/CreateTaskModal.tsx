import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal'

import { styles }  from '../../../styles/modal.styles'
import '../../../styles/CreateTaskModal.styles.css'
import useMobx from "../../../stores/store";
import { observer } from "mobx-react-lite";
function CreateTaskModal(){
    const { modalsStore } = useMobx()

    const handleCloseModal = () =>{
        modalsStore.CloseModal('createTaskModal')
    }

    return (
        <Modal style={styles} isOpen={modalsStore.modalsState.createTaskModal.isOpen} onRequestClose={handleCloseModal}>
            <div className="CreateTaskModal">
                <div className="CreateTaskModalTitle">Create new task</div>

                <div className="CreateTaskModalForm">
                    <input className="CreateTaskModalInput" placeholder="Title"/>
                    <input className="CreateTaskModalInput" placeholder="Priority"/>
                    <select className="CreateTaskModalSelect" id="">
                        <option value="" disabled selected>Status</option>
                        <option value="to-do">To do</option>
                        <option value="in-progress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                    <textarea className="CreateTaskModalTextArea" id="" placeholder="Description">

                    </textarea>
                </div>
                <button className="CreateTaskModalButton">Create</button>
            </div>
        </Modal>
    );
}
 
export default observer(CreateTaskModal);