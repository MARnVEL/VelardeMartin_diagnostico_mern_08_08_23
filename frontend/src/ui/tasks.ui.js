
/**
 * Esta función se utiliza para cambiar el estado en la interfaz del cliente sin
 * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
 * datos actualizados de la BD.
 * 
 * @param {string} id El id de la tarea que se eliminará de la UI.
 */
export const deleteTask = (id, setFn) => {
    setFn(prevState => {
        // console.log('El prevState en el deleteTask: ', prevState);
        return prevState.filter(t => t._id !== id)
    });
};

/**
 * Esta función se utiliza para cambiar el estado en la interfaz del cliente sin
 * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
 * datos actualizados de la BD.
 * 
 * @param {string} id El id de la tarea que cambiará su estado de completo a incompleto o viceversa
 */
export const toggleTaskUI = (id, setFn) => {
    setFn(prevState => prevState.map(t => (
        t._id === id
            ? {...t, status: !t.status}
            : t
    )));
};


/**
 * Esta función se utiliza para actualizar una tarea en la interfaz del cliente sin
 * necesidad de tener que hacer un fetch al backend para traer de nuevo todos los 
 * datos actualizados de la BD.
 * 
 * @param {object} task Un objeto tarea que es la tarea que se actualizará en la UI.
 */
export const updateTask = (task, setFn, closeEditMode) => {
    setFn(prevState => prevState.map(t => (
        t._id === task._id
            ? {...t, description: task.description}
            : t
    )));
    closeEditMode();
};


