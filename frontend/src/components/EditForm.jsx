import { useEffect, useState } from 'react';

// library imports
import { CheckIcon } from '@heroicons/react/24/outline';

const EditForm = ({ editedTask, closeEditMode, fnToUpdateATask }) => {
    
    const [ 
        updatedTaskDescription,
        setUpdatedTaskDescription
    ] = useState(editedTask.description);

    useEffect(() => {
        const closeModalIfEscaped = (e) => {
            e.key === 'Escape' && closeEditMode();
        };

        window.addEventListener('keydown', closeModalIfEscaped);

        return () => {
            window.removeEventListener('keydown', closeModalIfEscaped);
        };
    }, [closeEditMode]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        fnToUpdateATask({...editedTask, description: updatedTaskDescription});

    };
    return (
        <div
            role='dialog'
            aria-labelledby='editTask'
            onClick={ (e) => { e.target === e.currentTarget && closeEditMode() } }
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
                        Confirme actualizar la tarea para que ahora se lea: ${updatedTaskDescription}
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
