import { useEffect, useState } from 'react';

// Custom components:
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState(null);
    const [editedTask, setEditedTask] = useState(null);

    
    // Preparamos el cuerpo de la request;
    //const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log('La url', API_URL);
    
    const options = {
        headers: {
            'Content-type': 'application/json'
            // "Authorization": API_KEY
        }
    };
    
    /**
     * Funcion para hacer el primer fetch y traer todas las tareas de la colección.
     */
    async function fetchTasks() {
        const response = await fetch(API_URL, options);
        const data = await response.json();
        setTasks(data.tasks);
    };

    useEffect(() => {
        fetchTasks();
    });

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
            const request = await fetch(url, options);
            if (request.status !== 200) {
                alert('error al crear la tarea');
                return;
            }

            const response = await request.json();
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
     * @param {string} id El id de la tarea que cambiara su estado de completo a incompleto o viceversa
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
            ! en la parte que necesito
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


    /**
     * Esta función se utiliza para cambiar el estado en la interfaz del cliente sin
     * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
     * datos actualizados de la BD.
     * 
     * @param {string} id El id de la tarea que se actualizará en la UI.
     */

    const updateTask = (task) => {
        setTasks(prevState => prevState.map(t => (
            t._id === task._id
                ? {...t, description: task.description}
                : t
        )));

    };


    const fnToUpdateATask = async () => {
        console.log(e);

    }

    return (
        <main>
            <div className="container">
                <header>
                    <h1>My To Do wApp</h1>
                </header>
                <section>
                    <EditForm
                        editedTask={editedTask}
                        fnToUpdateATask={fnToUpdateATask}    
                    />
                </section>
                <CustomForm fnToAddATask={fnToAddATask} setTasks={setTasks} />
                {tasks && 
                    <TaskList
                        tasks={tasks}
                        fnToCompleteATask={fnToCompleteATask}
                        fnToDeleteATask={fnToDeleteATask}
                        fnToUpdateATask={fnToUpdateATask}
                    />
                }
            </div>
        </main>
    );
}

export default App;
