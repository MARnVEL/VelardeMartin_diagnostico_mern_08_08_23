
import { useState } from 'react';

// Library imports:
import { CheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Styles
import styles from './TaskItem.module.css';

// Custom utils:


const TaskItem = ({
        task,
        fnToCompleteATask,
        fnToDeleteATask,
        // fnToUpdateATask,
        enterEditMode
}) => {


    const [isChecked, setIsChecked] = useState(task.status);
    
    const handleCheckBoxChange = (e) => {
        let id = e.target.id;
        let status = e.target.checked;
        // console.log('el status: ', status);
        
        fnToCompleteATask(id, status);

        setIsChecked(!isChecked);
    };
    
    const handleDeleteTask = (id) => {
        fnToDeleteATask(id);
    }
    /* 
    const handleUpdateTask = (id) => {
    };
    */
    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    name={task.description}
                    id={task._id}
                    onChange={handleCheckBoxChange}
                />
                <label
                    htmlFor={task._id}
                    className={styles.label}
                >
                    {task.description}
                    <p className={styles.checkmark}>
                        <CheckIcon strokeWidth={2} width={24} height={24}/>
                    </p>
                </label>
            </div>
            <div className={styles["task-group"]}>
                <button
                    className='btn'
                    aria-label={`Update ${task.description} Task`}
                    onClick={() => enterEditMode(task)}
                >
                    <PencilSquareIcon width={24} height={24}/>

                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.description} Task`}
                    onClick={() => handleDeleteTask(task._id)}
                >
                    <TrashIcon width={24} height={24}/>
                </button>

            </div>
        </li>
    );
};

export default TaskItem;
