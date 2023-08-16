import { useEffect, useState } from 'react';

// Custom components:
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState(null);

    
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
    }
    useEffect(() => {
        fetchTasks();
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
            fetchTasks();
            // return response;

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
            fetchTasks();
            // return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    }

    const fnToUpdateATask = async () => {
        console.log(e);
    }

    return (
        <main>
            <div className="container">
                <header>
                    <h1>My To Do wApp</h1>
                </header>
                <CustomForm fnToAddATask={fnToAddATask} setTasks={setTasks} />
                {tasks && 
                    <TaskList
                        tasks={tasks}
                        fnToCompleteATask={fnToCompleteATask}
                        fnToDeleteATask={fnToDeleteATask}
                        fnToUpdateATask={fnToUpdateATask}
                    />}
            </div>
        </main>
    );
}

export default App;
