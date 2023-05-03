export default function makeStylish(tree) {
  const result = tree.map((elem) => {
    switch (elem.type) {
      case 'added':
        return `  + ${elem.key}: ${elem.value}`;
      case 'unchanged':
        return `    ${elem.key}: ${elem.value}`;
      case 'changed':
        return `  - ${elem.key}: ${elem.value[0]}\n  + ${elem.key}: ${elem.value[1]}`;
      default:
        return `  - ${elem.key}: ${elem.value}`;
    }
  });
  return result.join('\n');
}
