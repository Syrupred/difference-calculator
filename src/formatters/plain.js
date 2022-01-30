import _ from 'lodash';

const makeValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const makePlainFormat = (node, path = []) => {
  if (node.name === 'root') {
    return makePlainFormat(node.children, path);
  }
  const lines = node.map((obj) => {
    const newPath = [...path, obj.name];
    const connectedNewPath = newPath.join('.');
    switch (obj.type) {
      case 'added':
        return `Property '${connectedNewPath}' was added with value: ${makeValue(obj.value)}`;
      case 'deleted':
        return `Property '${connectedNewPath}' was removed`;
      case 'changed':
        return `Property '${connectedNewPath}' was updated. From ${makeValue(obj.oldValue)} to ${makeValue(obj.newValue)}`;
      case 'hasChildren':
        return makePlainFormat(obj.children, newPath);
      case 'unchanged':
        return undefined;
      default:
        throw new Error(`Unknown object status: '${obj.type}'!`);
    }
  });
  return lines.filter((str) => str !== undefined).join('\n');
};
export default makePlainFormat;
