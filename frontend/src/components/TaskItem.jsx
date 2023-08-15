
import { useState } from 'react';

// Library imports:
import { CheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Styles
import styles from './TaskItem.module.css';

// Custom utils:


const TaskItem = ({ task, setTasks }) => {
    
    const [ taskItem, setTaskItem ] = useState({});


    const [isChecked, setIsChecked] = useState(task.status);
    
    const handleCheckBoxChange = async (e) => {
        
        let id = e.target.id;
        let status = e.target.checked;
        console.log('el status: ', status)
        
        
        const url = `http://localhost:3000/api/tasks/${id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status
            })
        }

        try {
            const request = await fetch(url, options);
            console.log('El request: ', request)
            if (request.status !== 200) {
                alert('error al actualizar la tarea');
                return;
            }

            const response = await request.json();
            console.log('La response en el handleCheckbox: ', response)
            if (!response) {
                alert('tarea actualizada ok');
            }

            setTaskItem( response.updated_task  )

            return response;
            // useEffect(() => {
            //     async function fetchTasks() {
            //         const response = await fetch(API_URL);
            //         const data = await response.json();
            //         setTasks(data.tasks);
            //     }
            //     fetchTasks();
            // }, [])
            
        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }

        
        

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
                    aria-label={`Update ${taskItem.description} Task`}
                    // onClick={}
                >
                    <PencilSquareIcon width={24} height={24}/>

                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${taskItem.description} Task`}
                    // onClick={}
                >
                    <TrashIcon width={24} height={24}/>
                </button>

            </div>
        </li>
    );
};

export default TaskItem;
