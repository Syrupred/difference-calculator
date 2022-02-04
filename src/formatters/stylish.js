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
  switch (data.type) {
    case 'root':
      return `{\n${(data.children.map((obj) => makeStylishFormat(obj, depth))).join('\n')}\n}`;
    case 'added':
      return `${makeIndent(depth + 1)}+ ${data.name}: ${makeValue(data.value, depth)}`;
    case 'deleted':
      return `${makeIndent(depth + 1)}- ${data.name}: ${makeValue(data.value, depth)}`;
    case 'unchanged':
      return `${makeIndent(depth + 2)}${data.name}: ${makeValue(data.value, depth)}`;
    case 'changed':
      return `${makeIndent(depth + 1)}- ${data.name}: ${makeValue(data.oldValue, depth)}\n${makeIndent(depth + 1)}+ ${data.name}: ${makeValue(data.newValue, depth)}`;
    case 'hasChildren':
      return `${makeIndent(depth + 2)}${data.name}: {\n${(data.children.map((obj) => makeStylishFormat(obj, depth + 2))).join('\n')}\n${makeIndent(depth + 2)}}`;
    default:
      throw new Error(`Unknown object status: '${data.type}'!`);
  }
};

export default makeStylishFormat;
