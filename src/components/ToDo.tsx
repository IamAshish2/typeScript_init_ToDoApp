import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { Todo } from "../model";
import { useContext, useEffect, useRef, useState } from "react";
import { ToDoItemsContext } from "../store/todoItemsStore";


type Props = {
    todo: Todo,
    // handleDelete: (id: number) => void,
    // handleEdit: (e: React.FormEvent, editTodo: string, id: number) => void,
    // handleComplete: (id: number) => void
}

const ToDo = ({ todo }: Props) => { //{ todo, handleDelete, handleComplete, handleEdit }: Props
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputVal = useRef<HTMLInputElement>(null);
    const context = useContext(ToDoItemsContext);

    if (!context) {
        throw new Error("ToDoList must be used within a ToDoItemsProvider");
    }

    const { makeEdit,deleteItem, makeDone } = context;

    useEffect(() => {
        inputVal.current?.focus();
    }, [edit]);

    return (
        <form className="flex justify-around items-center border h-16 w-96 mt-3"
            onSubmit={(e) => {
                makeEdit(e,todo.id,editTodo)
                setEdit(false)
            }}
        >
            {edit ? <input className="outline-none" ref={inputVal} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} /> :
                <p className={`${todo.isDone ? 'line-through text-red-600' : ''}  text-white uppercase`}>{todo.todo}</p>
            }
            <div className="flex justify-between  w-16 ml-24">
                <div onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }}>
                    <CiEdit size={23} />
                </div>
                <div onClick={() => deleteItem(todo.id)}>
                    <MdDelete size={23} />
                </div>
                <div onClick={() => makeDone(todo.id)}>
                    <TiTick size={23} />
                </div>
            </div>
        </form>
    )
}

export default ToDo
