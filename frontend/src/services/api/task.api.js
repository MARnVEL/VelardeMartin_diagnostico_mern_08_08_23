
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Funcion para hacer el primer fetch y traer todas las tareas de la colección.
 */
export const fetchTasks = async () => {
    const response = await fetch(API_URL, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await response.json();
    return data.tasks;
};


export const addTask = async (url, options) => {
    const request = await fetch(url, options);
    if (request.status !== 200) {
        throw new Error('Error al crear la tarea');
    }
    const response = await request.json();
    return response;
};

export const updateTaks = async (url, options) => {

};

export const completeTask = async (url, options) => {

};

export const deleteTask = async (url) => {

};

