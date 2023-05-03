import _ from 'lodash';

export default function buildAST(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);
  const sortedKeys = allKeys.sort();

  const tree = sortedKeys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    } if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          type: 'unchanged',
          key,
          value: obj1[key],
        };
      } return {
        type: 'changed',
        key,
        value: [obj1[key], obj2[key]],
      };
    } return {
      type: 'deleted',
      key,
      value: obj1[key],
    };
  });
  return tree;
}
