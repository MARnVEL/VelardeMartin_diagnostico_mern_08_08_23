import { useState } from 'react';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid';

const CustomForm = ({ fnToAddATask }) => {
    const [task, setTask] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        await fnToAddATask({
            description: task,
            status: false
        });

        setTask('');
        console.log(task)
    };
    return (
        <form className="todo" onSubmit={handleFormSubmit}>
            <div className="wrapper">
                <input
                    type="text"
                    name=""
                    id="task"
                    className="input"
                    value={task}
                    onInput={(e) => setTask(e.target.value)}
                    required
                    autoFocus
                    maxLength={70}
                    placeholder="Ingrese una tarea"
                />
                <label htmlFor="task" className="label">
                    Ingrese una tarea
                </label>
            </div>
            <button
                className="btn"
                aria-label="Añade una tarea"
                type="submit"
            >
                <PlusIcon />
            </button>
        </form>
    );
};

export default CustomForm;
