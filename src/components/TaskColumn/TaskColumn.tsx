import { FunctionComponent, ReactElement } from "react";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";
import useMobx from "../../stores/store";

interface TaskColumnProps {
    name: string
    statusType: string
}
 
const TaskColumn: FunctionComponent<TaskColumnProps> = ({name, statusType}) => {
    const {taskStore} = useMobx()
    const GetTasksByStatus = (status: string): ReactElement[] => {
        return taskStore.tasks
            .filter( task => task.status.slug === status)
            .sort( (taskA, taskB) => taskA.priority - taskB.priority)
            .map(task => <ToDoListItem task={task}></ToDoListItem>)
    }
    
    return (
        <div className="column">
            <div className="column-title">
                {name}
            </div>
            <div className="todos">
                {GetTasksByStatus(statusType)}
            </div>
        </div>
    );
}
 
export default TaskColumn;