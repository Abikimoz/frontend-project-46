import path from 'node:path';
import _ from 'lodash';
import parser from './parsers.js';

function generateDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);
  const sortedKeys = allKeys.sort();

  const result = ['{'];
  for (let key of sortedKeys) {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`    ${key}: ${obj2[key]}`);
      } else if (obj1[key] !== obj2[key]) {
        result.push(`  - ${key}: ${obj1[key]}`);
        result.push(`  + ${key}: ${obj2[key]}`);
      }
    }
  }
  result.push('}');
  return result.join('\n');
}

function resolvePath(filepath) {
  return filepath.includes('fixtures')
    ? filepath
    : `${path.resolve()}/__fixtures__/${filepath}`;
}

export default function showDiff(filepath1, filepath2) {
  // const data1 = readFileSync(resolvePath(filepath1), { encoding: 'utf8' });
  // const data2 = readFileSync(resolvePath(filepath2), { encoding: 'utf8' });

  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = parser(path1);
  const data2 = parser(path2);

  // const parseData1 = JSON.parse(data1);
  // const parseData2 = JSON.parse(data2);

  return generateDiff(data1, data2);
}
