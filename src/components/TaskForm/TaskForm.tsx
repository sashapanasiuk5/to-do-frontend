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

    const handleSubmit = () => {
        if(formData.statusId !== undefined){
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