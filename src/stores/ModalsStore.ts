import { makeAutoObservable } from "mobx"
import ModalState from "../models/ModalState"

type ModalType = keyof ModalsStore

interface ModalsList{
    createTaskModal: ModalState
    openTaskModal: ModalState
    editTaskModal: ModalState
}
export default class ModalsStore{
    public modalsState: ModalsList ={
        createTaskModal: new ModalState(),
        openTaskModal: new ModalState(),
        editTaskModal: new ModalState()
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