import configureStore from 'app/store/configureStore';

describe('Store -> configureStore', () => {
  test('store is created', () => {
    const store = configureStore();
    expect(store).toBeTruthy();
    expect(store).toBeInstanceOf(Object);
    expect(typeof store).toBe('object');
    expect(store.getState).toBeTruthy();
    expect(store.getState).toBeInstanceOf(Function);
    expect(typeof store.getState).toBe('function');
    expect(store.dispatch).toBeTruthy();
    expect(store.dispatch).toBeInstanceOf(Function);
    expect(typeof store.dispatch).toBe('function');
  });
});
