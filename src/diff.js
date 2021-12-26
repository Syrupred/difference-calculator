import { readFileSync } from 'fs';
import path from 'path';
import parseData from './parsers.js';
import buildTree from './buildTree.js';

import makeFormat from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const extPath1 = path.parse(path1).ext;
  const extPath2 = path.parse(path2).ext;
  const file1 = parseData((readFileSync(path.resolve(process.cwd(), path1), 'utf-8')), extPath1);
  const file2 = parseData((readFileSync(path.resolve(process.cwd(), path2), 'utf-8')), extPath2);
  const comparison = buildTree(file1, file2);
  return makeFormat(comparison, format);
};
