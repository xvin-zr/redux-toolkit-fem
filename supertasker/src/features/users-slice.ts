import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import data from '../api/data.json';

type UserState = {
    entities: User[];
};

const initialState: UserState = {
    entities: data.users,
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;

function createUser(draftUser: DraftUser): User {
    return {
        id: nanoid(),
        tasks: [],
        ...draftUser,
    };
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<DraftUser>) => {
            const user = createUser(action.payload);
            state.entities.unshift(user);
        },
        removeUser: (state, action: PayloadAction<User['id']>) => {
            const index = state.entities.findIndex(
                (user) => user.id === action.payload,
            );
            state.entities.splice(index, 1);
        },
    },
});

const usersReducer = usersSlice.reducer;

export const { addUser, removeUser } = usersSlice.actions;
export default usersReducer;
