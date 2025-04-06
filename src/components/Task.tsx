import { useState } from "react";
import { TaskType } from "./TaskForm";
import './Task.css';

interface TaskProps {
    task: TaskType;
    onDelete: (id: number) => void;
    onEdit: (id: number, newName: string) => void;
    onToggleComplete: (id: number) => void;
}

export default function Task({ task, onDelete, onEdit, onToggleComplete }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);

    const handleSave = () => {
        const trimmedName = editedName.trim();
        if (trimmedName && trimmedName !== task.name) {
            onEdit(task.id, trimmedName);
        } else {
            setEditedName(task.name);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(task.name);
        setIsEditing(false);
    };

    return (
        <div className={`task ${task.isCompleted ? "checked" : ""}`}>
            <div className="task-content">
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggleComplete(task.id)}
                    id={`task-${task.id}`}
                    aria-label={`Mark "${task.name}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
                />

                {isEditing ? (
                    <div className="edit-container">
                        <input
                            className="task-name-edit"
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') handleCancel();
                            }}
                            autoFocus
                            aria-label="Edit task name"
                        />
                        <div className="edit-buttons">
                            <button
                                className="task-button save-button"
                                onClick={handleSave}
                                type="button"
                            >
                                Save
                            </button>
                            <button
                                className="task-button cancel-button"
                                onClick={handleCancel}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <label htmlFor={`task-${task.id}`} className="task-label">
                        <span className="task-name">{task.name}</span>
                    </label>
                )}
            </div>

            {!isEditing && (
                <div className="task-actions">
                    <button
                        className="task-button delete-button"
                        onClick={() => onDelete(task.id)}
                        type="button"
                        aria-label={`Delete task "${task.name}"`}
                    >
                        Delete
                    </button>
                    <button
                        className="task-button edit-button"
                        onClick={() => setIsEditing(true)}
                        type="button"
                        aria-label={`Edit task "${task.name}"`}
                    >
                        Edit
                    </button>

                </div>
            )}
        </div>
    );
}