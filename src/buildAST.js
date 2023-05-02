import _ from 'lodash';

function buildAST(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);
  const sortedKeys = allKeys.sort();
};
