import { makeAutoObservable } from "mobx";
import { Task } from "../components/ToDoList/models/Task";
import { Status } from "../components/ToDoList/models/Status";
import TaskDto from "../components/TaskForm/modals/TaskDto";


import {createTask, getAllTasks} from "../api/agent"
export default class TaskStore{
    tasks: Task[] = []
    statuses: Status[] = []
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

    deleteTask = (id: number) => {
        let index = this.tasks.findIndex( t => t.id === id)
        this.tasks.splice(index, 1)
    }
} 
