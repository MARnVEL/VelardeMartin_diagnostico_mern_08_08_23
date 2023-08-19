//*Importing the data model for tasks

import { TaskModel } from '../models/Task.models.js';

//!-------------------------------------------------------------------
const getActiveTasks = async (_req, res) => {
    console.log('Entró al método getActiveTasks');

    try {
        const tasks = await TaskModel.find({ isActive: true });

        // console.log(tasks)

        if (tasks.length === 0) {
            return res
                .status(404)
                .json({
                    message: "There's no active tasks for this user"
                })
                .end();
        }
        // console.log('Se ontuvieron todas las tareas activas');

        return res
            .status(200)
            .json({
                message: `### 🌟👇Quantity of active tasks: * ${tasks.length} * ###`,
                tasks
            })
            .end();
    } catch (error) {
        console.log('Error al obtener tareas:', error);
    }
};

//!----- Controlador para CREAR una tarea en la Base de Datos -----------
const createTask = async (req, res) => {
    const { description, ...OtherDataTask } = req.body;

    //Esto viene del auth.controllers: Cuando se hace la validación del jwt lo que se pega en la request, se pega con el guión bajo id ("_id"), y no con el uid. Ver controlador task (método createTask() del archivo task.controllers.js, en la parte de creación de una nueva tarea).

    const newTask = new TaskModel({
        description
    });

    try {
        const task = await newTask.save();

        console.log('New task created successfully', task);

        return res
            .status(200)
            .json({
                status: 200,
                message: 'Task created successfully ✨',
                created_task: task
            })
            .end();
    } catch (error) {
        console.log('Error trying to CREATE task', error);
        return res.status(500).json({
            msg: 'There was an error in the CREATION of the NEW TASK.'
        });
    }
};

//!Controlador para ACTUALIZAR una tarea de la Base de Datos. Requiere que se le envíe id del usuario ----
const updateTask = async (req, res) => {
    const id_task = req.params.id_task; //Obtengo el id de la tarea que viene en la ruta.

    const { description, ...OtherDataTask } = req.body;
    console.log('La description que recibe el back: ', description)
    if (!description) {
        //!OJO acá podría dar un error
        console.log('The data task is incomplete!');
        return res.status(400).json({
            msg: 'Please fill all the fields correctly.'
        });
    }

    if (!id_task) {
        return res.status(400).json({
            message: 'No task id in the request'
        });
    }

    try {
        const theOldTask = await TaskModel.findById(id_task);

        if (!theOldTask) {
            return res.status(400).json({
                message: 'The task was NOT FOUND!'
            });
        }

        const theUpdatedTask = await theOldTask.updateOne({
            description
        });

        console.log('The taks has been updated successfully');
        const theNewTask = await TaskModel.findById(id_task)

        return res
            .status(200)
            .json({
                msj: 'Task updated successfully ✨',
                updated_task: theNewTask
            })
            .end();
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({
                msg: 'There was an error trying to UPDATE the TASK.'
            })
            .end();
    }
};

//!Controlador para ELIMINAR una tarea de la aplicación. NO SE ELIMINA DE Base de Datos.-------
const softDeleteTask = async (req, res) => {
    const id_task = req.params.id_task; //Obtengo el id de la tarea que viene en la ruta.

    if (!id_task) {
        return res.status(400).json({
            message: 'No task id in the request'
        });
    }

    try {
        const theOldTask = await TaskModel.findById(id_task);

        if (!theOldTask || !theOldTask.isActive) {
            return res.status(400).json({
                message: 'The task was NOT FOUND!'
            });
        }

        const theDeletedTask = await theOldTask.updateOne({
            isActive: false
        });

        console.log('The taks has been DELETED successfully');
        return res
            .status(200)
            .json({
                msj: 'Task DELETED successfully 🚫',
                deleted_task: theDeletedTask
            })
            .end();
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({
                msg: 'There was an error trying to DELETE the TASK.'
            })
            .end();
    }
};

const changeStatusTask = async (req, res) => {
    const id_task = req.params.id_task; //Obtengo el id de la tarea que viene en la ruta.

    const { status } = req.body;
    console.log(status);

    // if ( status !== 'true' || status !== 'false' ) {
    //     //!OJO acá podría dar un error
    //     console.log('The task data is incomplete!');
    //     return res.status(400).json({
    //         msg: 'Please fill all the fields correctly.'
    //     });
    // }

    if (!id_task) {
        return res.status(400).json({
            message: 'No task id in the request'
        });
    }

    try {
        const theOldTask = await TaskModel.findById(id_task);

        if (!theOldTask || !theOldTask.isActive) {
            return res.status(400).json({
                message: 'The task was NOT FOUND!'
            });
        }

        const theUpdatedTask = await theOldTask.updateOne({
            status
        });

        const theNewTask = await TaskModel.findById(id_task)

        console.log('The taks has been updated successfully');
        return res
            .status(200)
            .json({
                msj: 'Task updated successfully ✨',
                updated_task: theNewTask
            })
            .end();
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({
                msg: 'There was an error trying to UPDATE the TASK.'
            })
            .end();
    }
};

export { getActiveTasks, changeStatusTask, createTask, softDeleteTask, updateTask };
