import { FunctionComponent } from "react";
import useMobx from "../../../stores/store";
import { styles } from "../../../styles/modal.styles";
import Modal from 'react-modal'
import { observer } from "mobx-react-lite";

import Alert from '../../../icons/alert.svg'
import './ConfirmationModal.styles.css'

interface ConfirmationModalProps {
    title: string
    message: string
    okButtonName: string
    onSuccess: () => void
}
 
const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({title,message, okButtonName, onSuccess}) => {
    const {modalsStore} = useMobx()

    const handleCloseModal = () => {
        modalsStore.CloseModal('confirmationModal')
    }

    return (
        <Modal style={styles} isOpen={modalsStore.modalsState.confirmationModal.isOpen} onRequestClose={handleCloseModal} ariaHideApp={false}>
            <div className="ConfirmationModal">
                <img src={Alert} alt="" className="ConfirmationModalImage"/>
                <div className="ConfirmationModalTitle">{title}</div>
                <div className="ConfirmationModalMessage">{message}</div>
                <div className="ConfirmationModalButtons">
                    <button className="ConfirmationModalButton Close" onClick={handleCloseModal}>Close</button>
                    <button className="ConfirmationModalButton Success" onClick={onSuccess}>{okButtonName}</button>
                </div>  
            </div>
        </Modal>
    );
}
 
export default observer(ConfirmationModal);