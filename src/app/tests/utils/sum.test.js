import utilFunctions from '../../utils/utilFunctions';

test('Test adding 1 and 2 is equal to three', () => {
  expect(utilFunctions.sum(1, 2)).toBe(3);
});
