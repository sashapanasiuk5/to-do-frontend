import { makeAutoObservable } from "mobx";
import { Task } from "../models/Task";
import { Status } from "../models/Status";
import TaskDto from "../models/TaskDto";


import {createTask, deleteTask, getAllStatuses, getAllTasks, updateTask} from "../api/agent"
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
        this.statuses = await getAllStatuses()
    }
    setTasks = (tasks: Task[]) => {
        this.tasks = tasks
    }

    addTask =(task: Task) => {
        this.tasks.push(task)
    }
    changeTaskStatus = async(task: Task, status: Status) => {
        await updateTask(task.id, {
            title: task.title,
            description: task.description,
            priority: task.priority,
            statusId: status.id
        })
        task.status = status
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

    deleteTask = async (id: number) => {
        await deleteTask(id)
        let index = this.tasks.findIndex( t => t.id === id)
        this.tasks.splice(index, 1)
    }

    selectTask = (task: Task) => this.selectedTask = task
    deselectTask = () => this.selectedTask = undefined; 
} 
