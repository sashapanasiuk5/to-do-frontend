import { createContext, useContext } from "react";
import TaskStore from "./TaskStore";

interface Store{
    taskStore: TaskStore
}

export const store: Store = {
    taskStore: new TaskStore()
}

export const StoreContext = createContext(store);

const useMobx = () => useContext(StoreContext);
export default useMobx;