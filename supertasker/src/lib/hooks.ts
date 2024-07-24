import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ApplicationDispatch, ApplicationState } from './store';

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
    useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export function useTasks() {
    const tasks = useAppSelector((state) => state.tasks.entities);
    const loading = useAppSelector((state) => state.tasks.loading ?? false);

    return [tasks, loading] as const;
}
