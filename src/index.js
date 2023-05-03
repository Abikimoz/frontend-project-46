import path from 'node:path';
import parser from './parsers.js';
import buildAST from './buildAST.js';
import formatter from './formatters/index.js';

function generateDiff(obj1, obj2, format) {
  const AST = buildAST(obj1, obj2);
  return formatter(AST, format);
  // const keys1 = Object.keys(obj1);
  // const keys2 = Object.keys(obj2);

  // const allKeys = _.union(keys1, keys2);
  // const sortedKeys = allKeys.sort();

  // formatter(ast, format)

//   const result = ['{'];
//   for (let key of sortedKeys) {
//     if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
//       result.push(`  - ${key}: ${obj1[key]}`);
//     } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       result.push(`  + ${key}: ${obj2[key]}`);
//     } else if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       if (obj1[key] === obj2[key]) {
//         result.push(`    ${key}: ${obj2[key]}`);
//       } else if (obj1[key] !== obj2[key]) {
//         result.push(`  - ${key}: ${obj1[key]}`);
//         result.push(`  + ${key}: ${obj2[key]}`);
//       }
//     }
//   }
//   result.push('}');
//   return result.join('\n');
}

function resolvePath(filepath) {
  return filepath.includes('fixtures')
    ? filepath
    : `${path.resolve()}/__fixtures__/${filepath}`;
}

export default function showDiff(filepath1, filepath2, format) {
  const path1 = resolvePath(filepath1);
  const path2 = resolvePath(filepath2);

  const data1 = parser(path1);
  const data2 = parser(path2);

  return generateDiff(data1, data2, format);
}
