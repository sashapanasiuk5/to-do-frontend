import { Status } from "./Status"

export class Task{
    name: string
    description: string
    status: Status

    constructor(name: string, description: string, status: Status){
        this.name = name
        this.description = description
        this.status = status
    }
}
