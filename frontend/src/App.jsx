import { Suspense, useState } from 'react';

// Custom Hooks:

// Custom components:
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';

// Custom utils:
import { fetchData } from './utils/fetchData';


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

const apiData = fetchData( API_URL, options );


function App() {
    
    const data = apiData.read();
    const tasks = data.tasks
    // const [ tasks, setTasks ] = useState(null);
    // const [description, setDescription] = useState('');


    const fnToAddATask = async ({description}) => {
        // console.log(task);
        // const [tasks, setTasks] = useState(null)

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
        const apiData = fetchData( url, options );
        
        const data = await apiData.read();
        
        console.log('La data dentro del fnToAddATask: ', data);
        // setTasks(data.tasks);

        // setTasks( prevState => [... prevState, task] );
        
    }

    // console.log('Las tareas', tasks);

    
    /* 
    const sendNewTaskToApi = async ({ description }) => {
        try {
            const request = await fetch('http://localhost:3000/api/tasks/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description
                })
            });

            if (request.status !== 201) {
                alert('error al crear la tarea');
                return;
            }

            const response = await request.json();

            if (!response) {
                alert('tarea creada ok');
            }
        } catch (error) {
            console.log(error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // console.log(formData.get('description'));

        const description = formData.get('description');

        if (!description) return;

        sendNewTaskToApi({ description })
            .then((e) => {
                console.log(e);
            })
            .catch((error) => console.log(error));

        // try {
        //   sendNewTaskToApi({description})
        // } catch (error) {
        //     console.log(error)
        // }
    };
    */

   return (

        /*
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Descripción</label>
                <input type="text" placeholder="Salir a correr" name="description" />
                <button type="submit">Crear</button>
            </form>
            <TaskList />
        </main>
*/
        <main>
            <div className="container">
                <header>
                    <h1>My To Do wApp</h1>
                </header>
                <CustomForm fnToAddATask={ fnToAddATask } />
                
                <Suspense fallback={ <div>Loaging...</div> } >
                    {tasks && <TaskList tasks={ tasks } />}
                </Suspense>
                
            </div>
        </main>
    );
}

export default App;
