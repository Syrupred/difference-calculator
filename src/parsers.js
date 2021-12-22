import yaml from 'js-yaml';

export default (data, ext) => {
  let parse;
  if (ext === '.json' || ext === '') {
    parse = JSON.parse;
  } else if (ext === '.yml' || ext === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};
