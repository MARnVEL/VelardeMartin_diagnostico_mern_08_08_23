import { useEffect, useState } from 'react';

// Third partty libraries:
import Swal from 'sweetalert2'

// Custom components:
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';

//My services
import { 
    fetchTasks,
    addTask,
    completeTask,
    deleteTaskApi,
    updateTaskApi
} from './services/api/tasks.api';

import {
    deleteTask,
    toggleTaskUI,
    updateTask
} from './ui/tasks.ui.js';

function App() {
    const [tasks, setTasks] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [previousFocusElement, setPreviousFocusElement] = useState(null);

    useEffect(() => {
        fetchTasks().then((tasks) => {
            setTasks(tasks);
        });
    }, []);

    const fnToAddATask = async ({ description }) => {
        const url = 'http://localhost:3000/api/tasks/add';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description
            })
        };
        try {
            const response = await addTask(url, options);
            /*
            if (response) {
                alert('Tarea creada correctamente!');
            }
            */
            return response;
        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    const fnToCompleteATask = async (taskId, status) => {
        // console.log(taskId);
        const url = `http://localhost:3000/api/tasks/${taskId}`;
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

            const response = await completeTask(url, options);

            /* 
            if (response) {
                alert('Tarea actualizada correctamente ✨');
            }
            */

            // Hacemos nuevamente la consulta get al backend para traer los datos actualizados con la tarea modificada
            /*
            ! Problema de este método: cada vez que modifique una tarea (aunque sólo sea una parte de ella), debo volver a llamar al backend para que me haga la consulta a la BD, traer toodas las task de nuevo al estado del App() y por lo tanto, re-rederizar todas las tareas.
            */
            // fetchTasks();

            /*
            ! Solución: primero modifico la BD y luego hago un render de la UI sólo
            ! en la parte que necesito.
            */
            toggleTaskUI(taskId, setTasks);
            return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    const fnToDeleteATask = async (taskId) => {
        // console.log('Id dentro del fnToDelete: ', taskId);
        const url = `http://localhost:3000/api/tasks/${taskId}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        try {
            const response = deleteTaskApi(url, options)

            /*
            if (response) {
                alert('Tarea eliminada con éxito ☢');
            }
            */

            deleteTask(taskId, setTasks);
            return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        
        setPreviousFocusElement(document.activeElement);
    };

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusElement.focus();
    };

    const fnToUpdateATask = async (task) => {
        const taskId = task._id;
        const description = task.description;

        const url = `http://localhost:3000/api/tasks/${taskId}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description
            })
        };

        try {
            const response = await updateTaskApi(url, options);
            updateTask(task, setTasks, closeEditMode);
            return response;
        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <main>
            <div className="container">
                <header>
                    <h1>My To Do wApp</h1>
                </header>

                {
                    isEditing && (
                        <EditForm
                            editedTask={ editedTask }
                            closeEditMode={ closeEditMode }
                            fnToUpdateATask={ fnToUpdateATask }
                        />
                    )
                }
                <CustomForm fnToAddATask={ fnToAddATask } setTasks={ setTasks } />
                {tasks && 
                    <TaskList
                        tasks={ tasks }
                        fnToCompleteATask={ fnToCompleteATask }
                        fnToDeleteATask={ fnToDeleteATask }
                        enterEditMode={ enterEditMode }
                    />
                }
            </div>
        </main>
    );
}

export default App;
