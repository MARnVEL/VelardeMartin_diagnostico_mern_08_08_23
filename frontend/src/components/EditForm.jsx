import { useState } from 'react';

// library imports
import { CheckIcon } from '@heroicons/react/24/outline';

const EditForm = ({ editedTask, closeEditMode, fnToUpdateATask }) => {
    
    const [ 
        updatedTaskDescription,
        setUpdatedTaskDescription
    ] = useState(editedTask.description);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // fnToUpdateATask();
        
    };
    return (
        <div
            role='dialog'
            aria-labelledby='editTask'
            // onClick={}
        >
            <form className="todo" onSubmit={handleFormSubmit}>
                <div className="wrapper">
                    <input
                        type="text"
                        name=""
                        id="editTask"
                        className="input"
                        value={updatedTaskDescription}
                        onInput={(e) => setUpdatedTaskDescription(e.target.value)}
                        required
                        autoFocus
                        maxLength={70}
                        placeholder="Actualice la tarea"
                    />
                    <label htmlFor="editTask" className="label">
                        Actualice la tarea
                    </label>
                </div>
                <button
                    className="btn"
                    aria-label={`
                        Confirme actualizar la tarea para que se lea: ${updatedTaskDescription}
                    `}
                    type="submit"
                >
                    <CheckIcon strokeWidth={2} width={24} height={24} />
                </button>
            </form>
        </div>
    );
};

export default EditForm;
