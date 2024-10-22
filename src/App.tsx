import { useContext, useState } from "react";
import InputFeild from "./components/InputFeild";
import { Todo } from "./model";
import ToDoList from "./components/ToDoList";
import ToDoItemsProvider, { ToDoItemsContext } from "./store/todoItemsStore";

const App: React.FC = () => { // react functional component

  // const [todos, setTodos] = useState<Todo[]>([]);
  // const handleAdd = (todoItems: string) => {
  //   if (todoItems) {
  //     // setTodos([...todos, { id: Date.now(), todoItems, isDone: false }])
  //   }
  // }

  
  return (
    <ToDoItemsProvider>
      <div className="bg-blue-500 h-screen w-full flex flex-col  items-center">
        <span className="text-3xl font-bold text-center text-white uppercase z-10 mt-2">Taskify</span>
        <InputFeild /> 
        {/* // handleAdd={handleAdd} */}
          <ToDoList /> 
          {/* //todos={todos} setTodos={setTodos} */}
      </div>
    </ToDoItemsProvider>
  );
}

export default App;
