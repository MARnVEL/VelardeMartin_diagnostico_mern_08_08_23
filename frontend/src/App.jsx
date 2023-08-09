import { useState } from 'react';

import Tasks from './components/Tasks';

import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);

    const sendNewTaskToApi = async ({ description }) => {
        try {
            const request = await fetch('http://localhost:3000/api/tasks', {
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

        /* try {
          sendNewTaskToApi({description})
        } catch (error) {
            console.log(error)
        } */
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Descripción</label>
                <input type="text" placeholder="Salir a correr" name="description" />
                <button type="submit">Crear</button>
            </form>
            <Tasks />
        </main>
    );
}

export default App;
