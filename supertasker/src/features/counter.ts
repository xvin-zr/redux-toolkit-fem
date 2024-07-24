import { createAction } from '@reduxjs/toolkit';

export type CounterState = {
    count: number;
};
type CounterAction =
    | {
          type: 'INCREMENT' | 'DECREMENT';
          payload: number;
      }
    | { type: 'RESET' };

const increment = createAction('INCREMENT', (amount: number) => {
    return {
        payload: amount,
    };
});

export function reducer(state: CounterState, action: CounterAction) {
    if (action.type === increment.type) {
        return { count: state.count + action.payload };
    }
    return state;
}
