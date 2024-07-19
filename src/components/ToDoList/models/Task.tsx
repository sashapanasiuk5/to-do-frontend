import { Status } from "./Status"

export class Task{
    name: string
    description: string
    status: Status
    priority: number

    constructor(name: string, description: string, priority: number, status: Status){
        this.name = name
        this.description = description
        this.status = status
        this.priority = priority
    }
}
