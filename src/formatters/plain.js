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
  const newPath = [...path, node.name];
  const connectedNewPath = newPath.join('.');
  switch (node.type) {
    case 'root':
      return (node.children.map((obj) => makePlainFormat(obj, path))).join('\n');
    case 'added':
      return `Property '${connectedNewPath}' was added with value: ${makeValue(node.value)}`;
    case 'deleted':
      return `Property '${connectedNewPath}' was removed`;
    case 'changed':
      return `Property '${connectedNewPath}' was updated. From ${makeValue(node.oldValue)} to ${makeValue(node.newValue)}`;
    case 'hasChildren':
      return (node.children.map((obj) => makePlainFormat(obj, newPath))).filter((str) => str !== undefined).join('\n');
    case 'unchanged':
      return undefined;
    default:
      throw new Error(`Unknown object status: '${node.type}'!`);
  }
};
export default makePlainFormat;
