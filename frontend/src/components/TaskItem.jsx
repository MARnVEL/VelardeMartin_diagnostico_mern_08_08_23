
import { useState } from 'react';

// Library imports:
import { CheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Styles
import styles from './TaskItem.module.css';

// Custom utils:
import { fetchData } from '../utils/fetchData';

const TaskItem = ({ task }) => {

    const [isChecked, setIsChecked] = useState(task.status);

    const handleCheckBoxChange = (e) => {

        console.log(e.target.id);
        console.log(e.target.value);
        let status = e.target.value === on ? true : false;
        // const url = `http://localhost:3000/api/tasks/${id}`;
        // const options = {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         status
        //     })
        // }
        // const apiData = fetchData( url, options );
        
        // const data = await apiData.read();

        setIsChecked(!isChecked);
    };

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
                    // onClick={}
                >
                    <PencilSquareIcon width={24} height={24}/>

                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.description} Task`}
                    // onClick={}
                >
                    <TrashIcon width={24} height={24}/>
                </button>

            </div>
        </li>
    );
};

export default TaskItem;
