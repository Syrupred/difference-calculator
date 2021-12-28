import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

export default (data, format) => {
  if (format === 'stylish') {
    return makeStylishFormat(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  return makePlainFormat(data);
};
