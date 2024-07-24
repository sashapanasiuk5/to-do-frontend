import React from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import { StoreContext, store} from './stores/store'
import {DndContext, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import CreateTaskModal from './components/modals/CreateTaskModal/CreateTaskModal';
import OpenTaskModal from './components/modals/OpenTaskModal/OpenTaskModal';
import EditTaskModal from './components/modals/EditTaskModal/EditTaskModal';

function App() {
  return (
    <div className="App">
      <StoreContext.Provider value={store} >
          <ToDoList/>
          <CreateTaskModal/>
          <OpenTaskModal/>
          <EditTaskModal/>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
