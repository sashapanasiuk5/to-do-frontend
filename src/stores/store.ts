import { createContext, useContext } from "react";
import TaskStore from "./TaskStore";
import ModalsStore from "./ModalsStore";
interface Store{
    taskStore: TaskStore
    modalsStore: ModalsStore
}

export const store: Store = {
    taskStore: new TaskStore(),
    modalsStore: new ModalsStore()
}

export const StoreContext = createContext(store);

const useMobx = () => useContext(StoreContext);
export default useMobx;