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

const makePlainFormat = (node) => {
  const iter = (data, path) => {
    const lines = data.map((obj) => {
      const newPath = [...path, obj.name];
      const connectedNewPath = newPath.join('.');
      switch (obj.status) {
        case 'added':
          return `Property '${connectedNewPath}' was added with value: ${makeValue(obj.value)}`;
        case 'deleted':
          return `Property '${connectedNewPath}' was removed`;
        case 'changed':
          return `Property '${connectedNewPath}' was updated. From ${makeValue(obj.oldValue)} to ${makeValue(obj.newValue)}`;
        case 'hasChildren':
          return iter(obj.children, newPath);
        default:
          return undefined;
      }
    });
    return lines.filter((str) => str !== undefined).join('\n');
  };
  return iter(node, []);
};
export default makePlainFormat;
