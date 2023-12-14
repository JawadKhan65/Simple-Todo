"use client"
import React, { use, useEffect, useState } from 'react';


const Task = () => {
    const getLocal = (): any | null => {
        const storedData = localStorage.getItem("list");
        if (storedData) {
            return JSON.parse(storedData);
        }
        return null;
    };
    const [inputData, setData]: any = useState('')
    const [task, setTask]: any = useState(getLocal())
    const [modified, setModified] = useState(false)

    const addTask = () => {

        if (!inputData) {

        }
        else {
            const allData: any = { id: new Date().getTime().toString(), name: inputData }
            setTask([...task, allData])
            setData('')
            console.log(inputData)
        }

    }
    const deleteTask = (id: any) => {
        const newItems = task.filter((elem: any) => {
            return id != elem.id;
        })
        setTask(newItems)
    }
    const editItem = (ind: any) => {
        const newEdit = task.filter((elem: any) => {

            if (elem.id == ind) {

                setData(elem.name)
                elem.name = inputData
                // setData("")


            }
        })
    }
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(task))
    }, [task])




    return (
        <>
            <h1 className="text-2xl border-2 p-1 border-green-400  bg-slate-800 font-mono text-center">TODO APP</h1>
            <div className='bg-blue-950-700 font-mono'>
                <h1 className='text-xl font-bold m-4'>Task : </h1>
                <input
                    className='ml-6 mb-3 mt-1 h-16 w-96 p-5 text-white bg-slate-800 border-2 border-green-400'
                    placeholder='Enter your Task here'
                    value={inputData}
                    onChange={(e) => { setData(e.target.value) }}
                />
                <button className=' bg-slate-800 w-16 m-3 h-16 rounded-sm border-2 border-green-400' onClick={addTask}>ADD</button>

                <div >
                    {task.map((ITEM: any) => {
                        return (
                            <div className='bg-slate-800 h-60 w-96 rounded-lg m-6 inline-flex border-1 border-2  ' key={ITEM.id}>
                                <div className='flex flex-col  p-5 text-white font-mono font-bold mb-8 h-50 w-80' >
                                    <h1 className='text-white font-mono font-bold mb-5 h-50 w-80 text-justify'> Task : </h1>
                                    <li>{ITEM.name}</li>
                                    <br></br>
                                    <div className='flex flex-row'>
                                        <button onClick={() => { deleteTask(ITEM.id) }} className='w-16 h-8 m-2 bg-slate-900 rounded-xl border-2 border-green-400'>Delete</button>
                                        <button onClick={() => { editItem(ITEM.id) }} className='w-16 h-8 m-2 bg-slate-900 rounded-xl border-2 border-green-400'>Edit</button>
                                    </div>
                                </div>




                            </div>)
                    })}

                </div>

            </div>
        </>
    );
};

export default Task;
