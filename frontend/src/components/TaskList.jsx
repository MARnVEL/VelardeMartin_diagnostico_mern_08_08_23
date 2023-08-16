// Custom components imports:
import TaskItem from './TaskItem';

// My libraries imports
import { convertToMillis } from '../library/library';

// Styles
import styles from './TaskList.module.css';

const TaskList = ({
        tasks,
        fnToCompleteATask,
        fnToDeleteATask,
        fnToUpdateATask
    }) => {
    return (
        <ul className={styles.tasks}>
            {tasks
                .sort((a, b) => convertToMillis(b.updatedAt) - convertToMillis(a.updatedAt))
                .map((task) => (
                    <TaskItem
                        key={task._id} 
                        task={task}
                        fnToCompleteATask={fnToCompleteATask}
                        fnToDeleteATask={fnToDeleteATask}
                        fnToUpdateATask={fnToUpdateATask}
                    />
                ))}
        </ul>
    );
};

export default TaskList;
