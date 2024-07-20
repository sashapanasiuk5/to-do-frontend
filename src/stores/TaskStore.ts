import { makeAutoObservable } from "mobx";
import { Task } from "../components/ToDoList/models/Task";
import { Status } from "../components/ToDoList/models/Status";

export default class TaskStore{
    tasks: Task[] = []
    constructor(){
        makeAutoObservable(this)
    }

    fetchTasksAsync = async () =>{
        this.tasks = [
            new Task(1, 'test', 'decsription', 1, new Status(1, 'To do', 'to-do')),
            new Task(2, 'test1', 'decsription1', 5, new Status(5, 'Done', 'done')),
            new Task(3, 'test2', 'decsription2', 1, new Status(5, 'Done', 'done')),
            new Task(4, 'test3', 'decsription3', 2, new Status(5, 'Done', 'done')),
        ]
    }
    setTasks = (tasks: Task[]) => {
        this.tasks = tasks
    }

    addTask =(task: Task) => {
        this.tasks.push(task)
    }

    deleteTask = (id: number) => {
        let index = this.tasks.findIndex( t => t.id === id)
        this.tasks.splice(index, 1)
    }
} 
