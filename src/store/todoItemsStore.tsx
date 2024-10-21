import { ReactNode, useReducer } from "react";
import { createContext } from "react"
import { Todo } from "../model"

type Actions =
    | { type: 'add', payload: string }
    | { type: 'remove', payload: number }
    | { type: 'done', payload: number }

const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), todo: action.payload, isDone: false }]
        case "remove":
            return state.filter(todo => todo.id != action.payload)
        case "done":
            return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
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
}
// the context creation 
export const ToDoItemsContext = createContext<TodoContextType | undefined>(undefined);

const ToDoItemsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(TodoReducer, []);

    const addNewItem = (todo: string) => {
        dispatch({
            type: 'add',
            payload: todo
        });
    }

    const deleteItem = (id:number) => {
        dispatch({
            type: 'remove',
            payload: id
        });
    }

    const makeDone = (id:number) => {
        dispatch({
            type:'done',
            payload:id
        })
    }

    <ToDoItemsContext.Provider
        value={{
            todoItems: state,
            addNewItem,
            deleteItem,
            makeDone
        }}
    >
        {children}
    </ToDoItemsContext.Provider>
}

export default ToDoItemsProvider;
