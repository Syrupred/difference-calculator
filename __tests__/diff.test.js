import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('diff JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  expect(diff(file1, file2)).toBe(expected);
});

test('diff YML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expected.txt');

  expect(diff(file1, file2)).toBe(expected);
});
