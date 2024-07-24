import * as React from 'react';
import { ChangeEvent, FunctionComponent, useState, useEffect} from 'react';
import { Task } from '../../models/Task';
import useMobx from '../../stores/store';

import './TaskForm.styles.css'
import TaskDto from '../../models/TaskDto';

export interface TaskFormData{
    title: string,
    description: string,
    priority: string,
    statusId: string
}

interface TaskFormValidationErrors{
    titleError: string | undefined,
    descriptionError: string | undefined,
    priorityError: string | undefined,
    statusError: string | undefined
}


interface Props {
    submitButtonName: string,
    submitAction: (task: TaskDto) => void
    taskForEditing: TaskDto | undefined
}
 
export const TaskForm: FunctionComponent<Props> = ({submitButtonName, submitAction, taskForEditing}) => {
    const { taskStore } = useMobx()
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: '',
        statusId: ''
    })

    const [isFormValid, setValidity] = useState(true)
    const [validationErrors, setErrors] = useState<TaskFormValidationErrors>({
        titleError: undefined,
        descriptionError: undefined,
        priorityError: undefined,
        statusError: undefined
    })

    useEffect(() => {
        if(taskForEditing !== undefined){
            setFormData({
                        title: taskForEditing.title,
                        description: taskForEditing.description,
                        priority: taskForEditing.priority.toString(),
                        statusId: taskForEditing.statusId.toString()
                    })
        }
    }, [taskForEditing])

    type InputElement = { name: string, value: string}
    const handleInputChange = (e: ChangeEvent<InputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const validateForm = () => {
        let isValid = true;
        const errors: TaskFormValidationErrors = {
            titleError: undefined,
            descriptionError: undefined,
            priorityError: undefined,
            statusError: undefined
        }
        if(formData.title.length < 5 || formData.title.length > 30){
            isValid = false;
            errors.titleError= "The length of title must be more than 5 and less than 30 characters"
        }

        if(formData.description.trim().length === 0){
            isValid = false;
            errors.descriptionError = "Description is required"
        }

        if(isNaN(Number(formData.priority))){
            isValid = false;
            errors.priorityError = "Priority must be a number"
        }
        else if(Number(formData.priority) <= 0){
            isValid = false;
            errors.priorityError = "Priority must be greater than 0"
        }

        if(isNaN(Number(formData.statusId))){
            isValid = false
            errors.statusError = "Status is required"
        }

        setValidity(isValid)
        setErrors(errors)
    }

    const handleSubmit = () => {
        validateForm()
        if(isFormValid === true){
            submitAction(
            {
                title: formData.title,
                description: formData.description,
                priority: parseInt(formData.priority),
                statusId: parseInt(formData.statusId)
            })
        }
    }

    return (
        <div className="TaskForm">
            <input className="TaskFormInput" placeholder="Title" value={formData.title} name='title' onChange={handleInputChange}/>
            <input className="TaskFormInput" placeholder="Priority" value={formData.priority} name='priority' onChange={handleInputChange}/>
            <select className="TaskFormSelect" value={formData.statusId} name='statusId' onChange={handleInputChange}>
                <option value="" disabled selected hidden>Status</option>
                {taskStore.statuses.map( (item) => <option value={item.id} key={item.id}>{item.name}</option>)}
            </select>
            <textarea className="TaskFormTextArea" id="" placeholder="Description" value={formData.description} name='description' onChange={handleInputChange}>

            </textarea>
            <button className="TaskFormButton" onClick={handleSubmit}>{submitButtonName}</button>
        </div>
                
    );
}