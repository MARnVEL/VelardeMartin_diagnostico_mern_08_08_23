import { Suspense, useEffect, useState } from 'react';


// Custom components:
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';




function App() {
    
    const [ tasks, setTasks ] = useState(null);
    // const { data, loading, error, handleCancelRequest } = useFetch(API_URL, options)
    
    
    // Preparamos el cuerpo de la request;
    //const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log('La url', API_URL);
    
    const options = {
        headers : {
            "Content-type": "application/json",
            // "Authorization": API_KEY
        }
    }
    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch(API_URL);
            const data = await response.json();
            setTasks(data.tasks);
        }
        fetchTasks();
    }, [])
    

    


    const fnToAddATask = async ({ description }) => {

        const url = 'http://localhost:3000/api/tasks/add'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description
            })
        }
        try {
            const request = await fetch(url, options);
            console.log('El request: ', request)
            if (request.status !== 200) {
                alert('error al crear la tarea');
                return;
            }

            const response = await request.json();
            // console.log('La response en el fnToAddATasks: ', response)
            if (!response) {
                alert('tarea creada ok');
            }
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
        // setTasks(data.tasks);

        // setTasks( prevState => [... prevState, task] );
        
    }

   return (

        <main>
            <div className="container">
                <header>
                    <h1>My To Do wApp</h1>
                </header>
                <CustomForm fnToAddATask={ fnToAddATask } setTasks={setTasks} />
                {/* error && <li>Error: {error}</li> */ }
                { /* loading && <li>Loading...</li> */ }
                { tasks && <TaskList tasks={ tasks } setTasks={setTasks} />}
                
            </div>
        </main>
    );
}

export default App;
