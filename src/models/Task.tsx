import { Status } from "./Status"
import TaskDto from "./TaskDto"

export class Task{
    id: number
    title: string
    description: string
    status: Status
    priority: number

    constructor(id: number, name: string, description: string, priority: number, status: Status){
        this.id = id
        this.title = name
        this.description = description
        this.status = status
        this.priority = priority
    }
}
