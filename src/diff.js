import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers.js';

const getDiffFiles = (file1, file2, sign = ' ', number = 4) => {
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
  return `{\n${iter(file1, file2)}  }`;
};

export default (path1, path2) => {
  const extPath1 = path.parse(path1).ext;
  const extPath2 = path.parse(path2).ext;
  const file1 = parseData((readFileSync(path.resolve(process.cwd(), path1), 'utf-8')), extPath1);
  const file2 = parseData((readFileSync(path.resolve(process.cwd(), path2), 'utf-8')), extPath2);
  return getDiffFiles(file1, file2);
};
