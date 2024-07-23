import { makeAutoObservable } from "mobx"
import ModalState from "../models/ModalState"
import ConfirmationModalState from "../models/ConfirmatiomModalState"

type ModalType = keyof ModalsStore

interface ModalsList{
    createTaskModal: ModalState
    openTaskModal: ModalState
    editTaskModal: ModalState
    confirmationModal: ModalState
}
export default class ModalsStore{
    public modalsState: ModalsList ={
        createTaskModal: new ModalState(),
        openTaskModal: new ModalState(),
        editTaskModal: new ModalState(),
        confirmationModal: new ModalState()
    }
    constructor(){
        makeAutoObservable(this)
    }

    OpenModal(modal: keyof ModalsList){
        this.modalsState[modal] = { isOpen: true };
    }

    CloseModal(modal: keyof ModalsList){
        this.modalsState[modal] = { isOpen: false };
    }

}