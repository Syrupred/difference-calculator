import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('diff JSON files - Stylish format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('stylish.txt');

  expect(diff(file1, file2)).toEqual(expected);
});

test('diff YAML files - Stylish format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('stylish.txt');

  expect(diff(file1, file2)).toEqual(expected);
});

test('diff JSON files - Plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('plain.txt');

  expect(diff(file1, file2, 'plain')).toEqual(expected);
});

test('diff YAML files - Plain format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('plain.txt');

  expect(diff(file1, file2, 'plain')).toEqual(expected);
});

test('diff JSON files - JSON format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expectedJSON.json');

  expect(diff(file1, file2, 'json')).toEqual(expected);
});

test('diff YAML files - JSON format', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expectedJSON.json');

  expect(diff(file1, file2, 'json')).toEqual(expected);
});
