import { expect } from 'vitest';
import tasksReducer, { addTask, createTask, TaskState } from './tasks-slice';

describe('tasksSlice', () => {
    const initialState: TaskState = {
        entities: [
            createTask({ title: 'Write tests' }),
            createTask({ title: 'Make them pass' }),
        ],
    };

    it(`should add a task when the ${addTask}`, function () {
        const task = createTask({ title: 'Profit' });
        const action = addTask(task);
        const newState = tasksReducer(initialState, action);

        expect(newState.entities).toEqual(initialState.entities.concat([task]));
    });
});
