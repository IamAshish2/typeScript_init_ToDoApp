import { useReducer, createContext } from "react";
import { Todo } from "../model"
import React from "react";

type Actions =
    | { type: 'add', payload: string }
    | { type: 'remove', payload: number }
    | { type: 'done', payload: number }
    | { type: 'edit', payload: {id:number,editedTodo:string} }

const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), todo: action.payload, isDone: false }]
        case "remove":
            return state.filter(todo => todo.id != action.payload)
        case "done":
            return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
        case "edit":
            return state.map(todo => todo.id === action.payload.id ? {...todo,todo:action.payload.editedTodo}: todo)
        default:
            return state
    }
}


// Define the shape of the context
interface TodoContextType {
    todoItems: Todo[];
    addNewItem: (todo: string) => void;
    deleteItem: (id: number) => void;
    makeDone: (id: number) => void;
    makeEdit:(e:React.FormEvent,id:number,editedTodo:string) => void
}
// the context creation 
export const ToDoItemsContext = createContext<TodoContextType | null>(null);

// React.ReactNode accepts the most inputs
// Provider component
interface TodoProviderProps {
    children: React.ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => { // { children }: { children: ReactElement }
    const [state, dispatch] = useReducer(TodoReducer, []);

    const addNewItem = (todo: string) => {
        dispatch({
            type: 'add',
            payload: todo
        });
    }

    const deleteItem = (id: number) => {
        dispatch({
            type: 'remove',
            payload: id
        });
    }

    const makeDone = (id: number) => {
        dispatch({
            type: 'done',
            payload: id
        })
    }

    const makeEdit = (e:React.FormEvent,id:number,editedTodo:string) => {
        e.preventDefault();
        dispatch({
            type:'edit',
            payload:{id,editedTodo}
        });
    }

    return (
        <ToDoItemsContext.Provider
            value={{
                todoItems: state,
                addNewItem,
                deleteItem,
                makeDone,
                makeEdit
            }}
        >
            {children}
        </ToDoItemsContext.Provider>
    )
}

export default TodoProvider;
