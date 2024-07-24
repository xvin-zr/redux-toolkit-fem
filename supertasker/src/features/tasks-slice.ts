import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { removeUser } from './users-slice';

export type TaskState = {
    entities: Task[];
    loading?: boolean;
};

type DraftTask = RequireOnly<Task, 'title'>;

export function createTask(draftTask: DraftTask): Task {
    return {
        id: nanoid(),
        ...draftTask,
    };
}

const initialState: TaskState = {
    entities: [],
    loading: false,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async function (): Promise<Task[]> {
        const resp = await fetch('/api/tasks').then((res) => res.json());
        return resp.tasks;
    },
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            const task = createTask(action.payload);
            state.entities.push(task);
        },
        removeTask: (state, action: PayloadAction<Task['id']>) => {
            const index = state.entities.findIndex(
                (task) => task.id === action.payload,
            );
            state.entities.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeUser, (state, action) => {
            const userId = action.payload;

            for (const task of state.entities) {
                if (task.user === userId) {
                    task.user = undefined;
                }
            }
        });

        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.entities = action.payload;
        });
    },
});
const tasksReducer = tasksSlice.reducer;

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksReducer;
