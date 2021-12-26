import _ from 'lodash';

const makeValue = (data) => {
  if (!_.isObject(data)) {
    if (_.isString(data)) {
      return `'${data}'`;
    }
    return data;
  }
  return '[complex value]';
};

const makePlainFormat = (node) => {
  const iter = (data, path) => {
    const lines = data.map((obj) => {
      const newPath = [path, obj.name].flat();
      if (obj.status === 'added') {
        return `Property '${newPath.join('.')}' was added with value: ${makeValue(obj.value)}`;
      }
      if (obj.status === 'deleted') {
        return `Property '${newPath.join('.')}' was removed`;
      }
      if (obj.status === 'changed') {
        return `Property '${newPath.join('.')}' was updated. From ${makeValue(obj.oldValue)} to ${makeValue(obj.newValue)}`;
      }
      if (obj.status === 'hasChildren') {
        return iter(obj.children, newPath.join('.'));
      }
      return undefined;
    });
    return lines.filter((str) => str !== undefined).join('\n');
  };
  return iter(node, []);
};
export default makePlainFormat;
