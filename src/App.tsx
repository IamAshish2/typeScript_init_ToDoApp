import { useState } from "react";
import InputFeild from "./components/InputFeild";
import { Todo } from "./model";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => { // react functional component

  // const [todo,setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);


  const handleAdd = (todo: string) => {
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
    }
  }
  

  return (
    <div className="bg-blue-500 h-screen w-full flex flex-col  items-center">
      <span className="text-3xl font-bold text-center text-white uppercase z-10 mt-2">Taskify</span>
      <InputFeild handleAdd={handleAdd} />
        <ToDoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
