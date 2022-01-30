import _ from 'lodash';

const makeIndent = (number) => ' '.repeat(number * 2);

const makeValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${makeIndent(depth + 4)}${key}: ${value}`;
    }
    return `${makeIndent(depth + 4)}${key}: ${makeValue(value, depth + 2)}`;
  });
  return ['{', ...lines, `${makeIndent(depth + 2)}}`].join('\n');
};

const makeStylishFormat = (data, depth = 0) => {
  if (data.name === 'root') {
    return `{\n${makeStylishFormat(data.children, depth)}\n}`;
  }
  const lines = data.map((obj) => {
    switch (obj.type) {
      case 'added':
        return `${makeIndent(depth + 1)}+ ${obj.name}: ${makeValue(obj.value, depth)}`;
      case 'deleted':
        return `${makeIndent(depth + 1)}- ${obj.name}: ${makeValue(obj.value, depth)}`;
      case 'unchanged':
        return `${makeIndent(depth + 2)}${obj.name}: ${makeValue(obj.value, depth)}`;
      case 'changed':
        return `${makeIndent(depth + 1)}- ${obj.name}: ${makeValue(obj.oldValue, depth)}\n${makeIndent(depth + 1)}+ ${obj.name}: ${makeValue(obj.newValue, depth)}`;
      case 'hasChildren':
        return `${makeIndent(depth + 2)}${obj.name}: {\n${makeStylishFormat(obj.children, depth + 2)}\n${makeIndent(depth + 2)}}`;
      default:
        throw new Error(`Unknown object status: '${obj.type}'!`);
    }
  });
  return lines.join('\n');
};

export default makeStylishFormat;
