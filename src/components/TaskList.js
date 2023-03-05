import React, { useState } from 'react'
import Task from './Task'

function TaskList() {
    // input laukelio būsena
    const [taskInput, setTaskInput] = useState('');
    // redagavimo rėžimas
    const [editTask, setEditTask] = useState(false);
    // atnaujinamo įrašo (task) pilnas objektas
    const [updateTask, setUpdateTask] = useState({});
    // pradiniai įrašai (tasks)
    const [tasks, setTasks] = useState([
        {id: 1, description: "Lorem ipsum 1", status: false},
        {id: 2, description: "Lorem ipsum 2", status: false},
        {id: 3, description: "Lorem ipsum 3", status: false},
        {id: 4, description: "Lorem ipsum 4", status: false},
        {id: 5, description: "Lorem ipsum 7", status: false},
        {id: 6, description: "Lorem ipsum 11", status: false}
      ]);

    // keičiame įrašo status
    function changeTaskStatus(id) {
        let copyOfTasks = [...tasks];
        copyOfTasks.forEach(task => {
            if(task.id === id){
                task.status = !task.status;
            }
        })
        setTasks(copyOfTasks);
    }

    // šaliname įrašą
    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // keičiame redagaivmo rėžimo būseną
    function handleEditTask(id){
        setEditTask(true);
        // randame redaguojamą įrašą pagal id
        const findTask = tasks.find(task => task.id === id);
        // pakeičiame input laukelio reikšmę į įrašo atitinkamą reikšmę
        setTaskInput(findTask.description);
        // išsaugome redaguojamą įrašą (pilną objektą)
        setUpdateTask(findTask);
    }

    // atnaujiname esamą įrašą
    function handleUpdateTask({id, status}){
        const newTasksList = tasks.map( (task) => {
            if (task.id === id){
                return {id: id, description: taskInput, status: status}
            }
            return task;
        })
        setTasks(newTasksList);
    }

    function handleSubmit(e){
        e.preventDefault();
        // jeigu ne redagaivmo rėžimas
        if (!editTask) {
            const task = { id: Math.random(), description: taskInput, status: false };
            setTasks((oldTasks) => [...oldTasks, task]);
            setTaskInput('');
        } else {
            // jeigu redagaivmo rėžimas
            handleUpdateTask(updateTask);
            setTaskInput('');
        }
      };

    let taskList = tasks.map(task => 
        <Task 
            key={task.id} 
            id={task.id} 
            description={task.description} 
            status={task.status} 
            changeTaskStatus={changeTaskStatus} 
            deleteTask={deleteTask}
            handleEditTask={handleEditTask} />
    )

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                id='taskInput'
                name='taskInput'
                value={taskInput}
                placeholder = "Add task..."
                onChange={(e) => setTaskInput(e.target.value)}/>
        </form>
        <ul>{taskList}</ul>
    </div>
  )
}

export default TaskList