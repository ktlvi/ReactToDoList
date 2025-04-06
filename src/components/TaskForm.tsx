import { useState, useEffect, FormEvent } from "react";
import Task from "./Task";
import './TaskForm.css';

export type TaskType = {
    id: number;
    name: string;
    isCompleted: boolean;
}

export function TaskForm() {
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function editTask(id: number, newName: string) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, name: newName } : task
        ));
    }

    function toggleTaskCompletion(id: number) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    }

    function addTask(e: FormEvent) {
        e.preventDefault();
        if (taskName.trim()) {
            const newTask: TaskType = {
                id: Date.now(),
                name: taskName.trim(),
                isCompleted: false
            };
            setTasks([...tasks, newTask]);
            setTaskName("");
        }
    }

    return (
        <>
            <div className='task-adder'>
                <form onSubmit={addTask}>
                    <label htmlFor="taskName"> ToDo List</label>
                    <input
                        id="taskName"
                        type="text"
                        name="taskName"
                        value={taskName}
                        className='task-input'
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Enter a new task"
                    />
                    <button
                        type="submit"
                        className='add-task-button'
                        disabled={!taskName.trim()}
                    >
                        Add task
                    </button>
                </form>
            </div>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <p className="empty-list-message">No tasks yet. Add a task to get started!</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id} className='task-list-item'>
                                <Task
                                    task={task}
                                    onDelete={deleteTask}
                                    onEdit={editTask}
                                    onToggleComplete={toggleTaskCompletion}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
