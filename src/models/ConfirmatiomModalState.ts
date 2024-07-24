import ModalState from "./ModalState"

export default class ConfirmationModalState extends ModalState{
    message: string = ""
    onSuccess: () => void = () => {}
}