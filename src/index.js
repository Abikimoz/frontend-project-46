import { log } from 'node:console';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';

export default function showDiff(filepath1, filepath2) {
  console.log(resolvePath(filepath1));
  console.log(resolvePath(filepath2));

  const data1 = readFileSync(resolvePath(filepath1), { encoding: 'utf8' });
  const data2 = readFileSync(resolvePath(filepath2), { encoding: 'utf8' });

  const parseData1 = JSON.parse(data1);
  const parseData2 = JSON.parse(data2);

  // console.log(path.resolve());
  // console.log(process.cwd());

  generateDiff(parseData1, parseData2);

//   console.log(parseData1, parseData2);
}

function resolvePath(filepath) {
  return filepath.includes('fixtures')
    ? filepath
    : `${path.resolve()}/__fixtures__/${filepath}`;
}

function generateDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);
  const sortedKeys = allKeys.sort();

  const result = [`{`];
  for (let key of sortedKeys) {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj2[key]}`);
    } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`    ${key}: ${obj2[key]}`);
      } else if (obj1[key] !== obj2[key]) {
        result.push(`  - ${key}: ${obj1[key]}`);
        result.push(`  + ${key}: ${obj2[key]}`);
      }
    }
  }
  result.push(`}`)
  console.log(result.join(`\n`));
}
