import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal'

import { styles }  from '../../../styles/modal.styles'
import '../../../styles/CreateTaskModal.styles.css'
function CreateTaskModal(){
    return (
        <Modal isOpen={true} style={styles}>
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
 
export default CreateTaskModal;