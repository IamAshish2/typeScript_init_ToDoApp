import { log } from 'console'
import React, { useRef } from 'react'

interface Props {
    // todo: string,
    // setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (value:string) =>  void;
}

const InputFeild = ({  handleAdd }: Props) => {
    const inputValue = useRef<HTMLInputElement>(null);

    const add = (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(inputValue.current){
            handleAdd(inputValue.current.value);
            inputValue.current.value = "";
        }
    }

    return (
        <form className='flex gap-2 mt-6' onSubmit={add}>
            <input type="input" 
                ref={inputValue}
                placeholder='Enter a task'
                 className='p-2 outline-none rounded-sm w-52' />
            <button className=' bg-green-400 rounded-full p-2 w-22 text-white font-bold'>Add Task</button>
        </form>
    )
}

export default InputFeild
