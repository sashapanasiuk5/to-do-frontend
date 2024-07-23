import { makeAutoObservable } from "mobx";
import { Task } from "../models/Task";
import { Status } from "../models/Status";
import TaskDto from "../models/TaskDto";


import {createTask, getAllTasks, updateTask} from "../api/agent"
export default class TaskStore{
    tasks: Task[] = []
    statuses: Status[] = []
    selectedTask: Task | undefined = undefined
    constructor(){
        makeAutoObservable(this)
    }

    fetchTasksAsync = async () =>{
        this.tasks = await getAllTasks()
    }

    fetchStatusesAsync = async () => {
        this.statuses = [
            new Status(1, 'To do', 'to-do'),
            new Status(2, 'In Progress', 'in-progress'),
            new Status(3, 'Done', 'done')
        ]
    }
    setTasks = (tasks: Task[]) => {
        this.tasks = tasks
    }

    addTask =(task: Task) => {
        this.tasks.push(task)
    }

    createTask = async (dto: TaskDto) =>{
        const task: Task = await createTask(dto);
        this.addTask(task);
    }
    updateTask = async(editedTask:Task, dto: TaskDto) => {
        await updateTask(editedTask.id, dto);

        editedTask.title = dto.title;
        editedTask.description = dto.description;
        editedTask.priority = dto.priority;
        const status = this.statuses.find( s => s.id === dto.statusId)
        if(status == undefined)
            throw new Error("Status is not found")
        editedTask.status = status;
    }

    deleteTask = (id: number) => {
        let index = this.tasks.findIndex( t => t.id === id)
        this.tasks.splice(index, 1)
    }

    selectTask = (task: Task) => this.selectedTask = task
    deselectTask = () => this.selectedTask = undefined; 
} 
