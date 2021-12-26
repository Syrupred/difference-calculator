import _ from 'lodash';

const makeIndent = (number) => ' '.repeat(number);

const makeValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${makeIndent(depth + 8)}${key}: ${value}`;
    }
    return `${makeIndent(depth + 8)}${key}: ${makeValue(value, depth + 4)}`;
  });
  return ['{', ...lines, `${makeIndent(depth + 4)}}`].join('\n');
};

export default (data) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((obj) => {
      if (obj.status === 'added') {
        return `${makeIndent(depth + 2)}+ ${obj.name}: ${makeValue(obj.value, depth)}`;
      }
      if (obj.status === 'deleted') {
        return `${makeIndent(depth + 2)}- ${obj.name}: ${makeValue(obj.value, depth)}`;
      }
      if (obj.status === 'unchanged') {
        return `${makeIndent(depth + 4)}${obj.name}: ${makeValue(obj.value, depth)}`;
      }
      if (obj.status === 'changed') {
        return `${makeIndent(depth + 2)}- ${obj.name}: ${makeValue(obj.oldValue, depth)}\n${makeIndent(depth + 2)}+ ${obj.name}: ${makeValue(obj.newValue, depth)}`;
      }

      return `${makeIndent(depth + 4)}${obj.name}: ${iter(obj.children, depth + 4)}`;
    });
    return ['{', ...lines, `${makeIndent(depth)}}`].join('\n');
  };
  return iter(data, 0);
};
