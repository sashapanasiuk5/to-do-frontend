import { FunctionComponent, ReactElement } from "react";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";
import useMobx from "../../stores/store";
import { useDroppable } from "@dnd-kit/core";

interface TaskColumnProps {
    name: string
    statusType: string
}
 
const TaskColumn: FunctionComponent<TaskColumnProps> = ({name, statusType}) => {
    const {taskStore} = useMobx()
    const {setNodeRef} = useDroppable({
        id: statusType
      });
    const GetTasksByStatus = (status: string): ReactElement[] => {
        return taskStore.tasks
            .filter( task => task.status.slug === status)
            .sort( (taskA, taskB) => taskA.priority - taskB.priority)
            .map(task => <ToDoListItem key={task.id} task={task}></ToDoListItem>)
    }
    return (
        
        <div className="column" ref={setNodeRef}>
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