import _ from 'lodash';

const buildChildrenRoot = (data1, data2) => {
  const dataKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  return dataKeys.map((key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: valueData2 };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'deleted', value: valueData1 };
    }
    if (_.isObject(valueData1) && _.isObject(valueData2)) {
      return {
        name: key, status: 'hasChildren', children: buildChildrenRoot(valueData1, valueData2),
      };
    }
    if (valueData1 !== valueData2) {
      return {
        name: key, status: 'changed', oldValue: valueData1, newValue: valueData2,
      };
    }
    return { name: key, status: 'unchanged', value: valueData1 };
  });
};
const buildTree = (data1, data2) => {
  const childrenRoot = buildChildrenRoot(data1, data2);
  return { name: 'root', status: 'allСontent', children: childrenRoot };
};
export default buildTree;
