import { test, expect } from '@jest/globals';
import result from '../__fixtures__/result';
import showDiff from '../src/index';

test('gendiff', () => {
  expect(showDiff('file1.json', 'file2.json')).toBe(result);
//   expect(1).toBe(1);
});
