import { useState } from "react"
import { Todo } from "../model"
import ToDo from "./ToDo"

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const ToDoList = ({ todos, setTodos }: Props) => {


  function handleEdit(e:React.FormEvent,editTodo:string,id:number) {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? {...todo,todo:editTodo} : todo
    )))
  }

  function handleDelete(id: number) {
    setTodos(todos.filter(todo => todo.id != id))
  }

  function handleComplete(id: number) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }


    return (
      <>
        {todos.map(todo => (
          <ToDo key={todo.id} todo={todo} handleComplete={handleComplete} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
      </>
    )
  }

  export default ToDoList
