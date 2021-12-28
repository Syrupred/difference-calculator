import makeStylishFormat from './stylish.js';
import makePlainFormat from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishFormat(data);
    case 'json':
      return JSON.stringify(data);
    case 'plain':
      return makePlainFormat(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
