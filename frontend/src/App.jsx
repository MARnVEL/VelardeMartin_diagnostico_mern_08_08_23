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
            console.log('El request: ', request);
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
        console.log(taskId);
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

            fetchTasks();
            // return response;

        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    const fnToDeleteATask = async (taskId) => {
        console.log('Id dentro del fnToDelete: ', taskId);
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
                        setTasks={setTasks}
                        fnToCompleteATask={fnToCompleteATask}
                        fnToDeleteATask={fnToDeleteATask}
                    />}
            </div>
        </main>
    );
}

export default App;
