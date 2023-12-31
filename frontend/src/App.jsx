import { useEffect, useState } from 'react';

// Custom components:
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';

//My services
import { 
    fetchTasks,
    addTask,
    completeTask,
    deleteTask,
    updateTaks
} from './services/api/task.api';

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
            if (!response) {
                alert('tarea creada ok');
            }
            return response;
        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };


    /**
     * Esta función se utiliza para cambiar el estado en la interfaz del cliente sin
     * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
     * datos actualizados de la BD.
     * 
     * @param {string} id El id de la tarea que cambiará su estado de completo a incompleto o viceversa
     */
    const toggleTaskUI = (id) => {
        setTasks(prevState => prevState.map(t => (
            t._id === id
                ? {...t, status: !t.status}
                : t
        )));
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
            const request = await fetch(url, options);

            if (request.status !== 200) {
                alert('error al actualizar la tarea');
                return;
            }

            const response = await request.json();

            if (!response) {
                alert('tarea actualizada ok');
            }

            // Hacemos nuevamente la consulta get al backend para traer los datos actualizados con la tarea modificada
            /*
            ! Problema de este método: cada vez que modifique una tarea (aunque sólo sea una parte de ella), debo volver a llamar al backend para que me haga la consulta a la BD, traer toodas las task de nuevo al estado del App() y por lo tanto, re-rederizar todas las tareas.
            */
            // fetchTasks();

            /*
            ! Solución: primero modifico la BD y luego hago un render de la UI sólo
            ! en la parte que necesito.
            */
            toggleTaskUI(taskId);
            // return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    /**
     * Esta función se utiliza para cambiar el estado en la interfaz del cliente sin
     * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
     * datos actualizados de la BD.
     * 
     * @param {string} id El id de la tarea que se eliminará de la UI.
     */
    const deleteTask = (id) => {
        setTasks(prevState => {
            // console.log('El prevState en el deleteTask: ', prevState);
            return prevState.filter(t => t._id !== id)
        });
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
            const request = await fetch(url, options);

            if (request.status !== 200) {
                alert('error al eliminar la tarea');
                return;
            }

            const response = await request.json();

            if (!response) {
                alert('tarea actualizada ok');
            }

            // Hacemos nuevamente la consulta get al backend para traer los datos actualizados con la tarea modificada
            /*
            ! Problema de este método: cada vez que modifique una tarea (aunque sólo sea una parte de ella), debo volver a llamar al backend para que me haga la consulta a la BD, traer toodas las task de nuevo al estado del App() y por lo tanto, re-rederizar todas las tareas.
            */
            // fetchTasks();
            /*
            ! Solución: primero modifico la BD y luego hago un render de la UI sólo
            ! en la parte que necesito
            */
            deleteTask(taskId);
            
            // return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    }

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        
        setPreviousFocusElement(document.activeElement);
    };

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusElement.focus();
    };


    /**
     * Esta función se utiliza para actualizar una tarea en la interfaz del cliente sin
     * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
     * datos actualizados de la BD.
     * 
     * @param {object} task Un objeto tarea que es la tarea que se actualizará en la UI.
     */
    const updateTask = (task) => {
        setTasks(prevState => prevState.map(t => (
            t._id === task._id
                ? {...t, description: task.description}
                : t
        )));
        closeEditMode();
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
        }

        try {
            const request = await fetch(url, options);

            if (request.status !== 200) {
                alert('error al actualizar la tarea');
                return;
            }

            const response = await request.json();
            // console.log('La respuesta del fnToUpdateATask: ', response);

            if (!response) {
                alert('tarea actualizada ok');
            }

            // Hacemos nuevamente la consulta get al backend para traer los datos actualizados con la tarea modificada
            /*
            ! Problema de este método: cada vez que modifique una tarea (aunque sólo sea una parte de ella), debo volver a llamar al backend para que me haga la consulta a la BD, traer toodas las task de nuevo al estado del App() y por lo tanto, re-rederizar todas las tareas.
            */
            // fetchTasks();
            /*
            ! Solución: primero modifico la BD y luego hago un render de la UI sólo
            ! en la parte que necesito
            */
            updateTask(task);

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }

    }

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
