import configureStore from 'app/store/configureStore';
import { updateAppIsLoading } from 'app/store/actions';

describe('Store -> actions -> app', () => {
  test('exists', () => {
    const store = configureStore();
    const state = store.getState();
    expect(state).toEqual(expect.objectContaining({ app: expect.any(Object) }));
  });

  test('updates isLoading correctly', () => {
    const store = configureStore();
    const state = store.getState();
    const { isLoading } = state.app;
    expect(isLoading).toBe(false);

    store.dispatch(updateAppIsLoading(true));
    const newState = store.getState();
    const { isLoading: newIsLoading } = newState.app;
    expect(newIsLoading).toBe(true);
  });
});
