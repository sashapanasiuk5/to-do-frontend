import React from 'react';
import ToDoList from './components/ToDoList/ToDoList';
import { StoreContext, store} from './stores/store'

function App() {
  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <ToDoList/>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
