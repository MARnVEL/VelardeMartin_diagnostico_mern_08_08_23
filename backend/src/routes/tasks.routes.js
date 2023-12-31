import { Router } from 'express';

const TaskRouter = Router();

//*##################- importing controllers -###########################

import { getActiveTasks, createTask, updateTask, softDeleteTask, changeStatusTask } from '../controllers/task.controllers.js';

// Obtener todos las tareas
TaskRouter.get('/', getActiveTasks);

// Insertar una nueva tarea
TaskRouter.post('/add', createTask);

// Eliminar una tarea por su ID
TaskRouter.delete('/:id_task', softDeleteTask);

// Actualizar una tarea por su ID
TaskRouter.put('/:id_task', updateTask);

// Actualizar el estado de una tare
TaskRouter.patch('/:id_task', changeStatusTask);

export { TaskRouter };
