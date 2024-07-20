import { Status } from "./Status"

export class Task{
    id: number
    name: string
    description: string
    status: Status
    priority: number

    constructor(id: number, name: string, description: string, priority: number, status: Status){
        this.id = id
        this.name = name
        this.description = description
        this.status = status
        this.priority = priority
    }
}
