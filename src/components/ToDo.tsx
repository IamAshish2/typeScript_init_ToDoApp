import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { Todo } from "../model";
import { useEffect, useRef, useState } from "react";


type Props = {
    todo: Todo,
    handleDelete: (id: number) => void,
    handleEdit: (e: React.FormEvent, editTodo: string, id: number) => void,
    handleComplete: (id: number) => void
}

const ToDo = ({ todo, handleDelete, handleComplete, handleEdit }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputVal = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputVal.current?.focus();
    }, [edit]);

    return (
        <form className="flex justify-around items-center border h-16 w-96 mt-3" onSubmit={(e) => {
            handleEdit(e, editTodo, todo.id)
            setEdit(false)
        }}>
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
                <div onClick={() => handleDelete(todo.id)}>
                    <MdDelete size={23} />
                </div>
                <div onClick={() => handleComplete(todo.id)}>
                    <TiTick size={23} />
                </div>
            </div>
        </form>
    )
}

export default ToDo
