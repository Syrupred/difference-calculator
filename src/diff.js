import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const getDiffFiles = (file1, file2, sign = ' ', number = 2) => {
  const dataKeys = _.sortBy(Object.keys({ ...file1, ...file2 }));
  const indent = sign.repeat(number);
  const iter = (data1, data2) => {
    const comparison = dataKeys.reduce((acc, key) => {
      if (!data2[key]) {
        return `${acc}${indent}- ${key}: ${data1[key]}\n`;
      }
      if (!data1[key]) {
        return `${acc}${indent}+ ${key}: ${data2[key]}\n`;
      }
      if (data1[key] === data2[key]) {
        return `${acc}${indent}  ${key}: ${data1[key]}\n`;
      }
      if (data1[key] !== data2[key]) {
        return `${acc}${indent}- ${key}: ${data1[key]}\n${indent}+ ${key}: ${data2[key]}\n`;
      }
      return acc;
    }, '');
    return comparison;
  };
  return `{\n${iter(file1, file2)}}`;
};

export default (path1, path2) => {
  if (path1.slice(-5) === '.json' && path2.slice(-5) === '.json') {
    const file1 = JSON.parse(readFileSync(path.resolve(process.cwd(), path1), 'utf-8'));
    const file2 = JSON.parse(readFileSync(path.resolve(process.cwd(), path2), 'utf-8'));
    return getDiffFiles(file1, file2);
  }
  return 'ошибка';
};
