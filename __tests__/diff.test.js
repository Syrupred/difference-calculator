import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [{
  firstFile: 'file1.json',
  secondFile: 'file2.yaml',
  resultFile: 'stylish.txt',
  format: 'JSON',
  style: 'stylish',
},
{
  firstFile: 'file1.yml',
  secondFile: 'file2.yaml',
  resultFile: 'stylish.txt',
  format: 'YAML',
  style: 'stylish',
},
{
  firstFile: 'file1.json',
  secondFile: 'file2.json',
  resultFile: 'plain.txt',
  format: 'JSON',
  style: 'plain',
},
{
  firstFile: 'file1.yml',
  secondFile: 'file2.yaml',
  resultFile: 'plain.txt',
  format: 'YAML',
  style: 'plain',
},
{
  firstFile: 'file1.json',
  secondFile: 'file2.json',
  resultFile: 'expectedJSON.json',
  format: 'JSON',
  style: 'json',
},
{
  firstFile: 'file1.yml',
  secondFile: 'file2.yaml',
  resultFile: 'expectedJSON.json',
  format: 'YAML',
  style: 'json',
},
];

test.each(cases)(
  'diff $format files - $style format',
  ({
    firstFile, secondFile, resultFile, style,
  }) => {
    const file1 = getFixturePath(firstFile);
    const file2 = getFixturePath(secondFile);
    const expected = readFile(resultFile);

    expect(diff(file1, file2, style)).toEqual(expected);
  },
);
