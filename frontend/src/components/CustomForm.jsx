import { useState } from 'react';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid';

const CustomForm = ({ fnToAddTask }) => {
    const [task, setTask] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form className="todo" onSubmit={handleFormSubmit}>
            <div className="wrapper"></div>
        </form>
    );
};

export default CustomForm;
