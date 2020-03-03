import React, { useState } from 'react';
import './FormNestedSelect.scss';
import 'antd/dist/antd.css';
import { Cascader } from 'antd';

const findNode = (tree, id) => {
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.id === id) {
      return node;
    } if (node.children && node.children.length > 0) {
      const result = findNode(node.children, id);
      if (result) return result;
    }
  }
  return undefined;
};

const setNode = (tree, record) => {
  if (!record.parent_id) {
    tree.push({ id: record.id, value: record.name, label: record.name });
    return;
  }
  const parentNode = findNode(tree, record.parent_id);
  if (parentNode) {
    if (parentNode.children && parentNode.children.length > 0) {
      parentNode.children.push({ id: record.id, value: record.name, label: record.name });
    } else {
      parentNode.children = [{ id: record.id, value: record.name, label: record.name }];
    }
  }
};

const getPath = (tree, value, path = []) => {
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.value === value) {
      path.push(node.value);
      return path;
    } if (node.children && node.children.length > 0) {
      const result = getPath(node.children, value, [...path, node.value]);
      if (result) return result;
    }
  }
  return undefined;
};

const getOptions = (issueCategory2) => {
  const newOptions = [];
  if (issueCategory2) {
    issueCategory2.forEach((record) => {
      setNode(newOptions, record);
    });
  }
  return newOptions;
};

const FormNestedSelect = ({
  issueCategory2, defaultValue, children, input, disabled, meta: { touched, error, warning }, up, touch, onTouch,
}) => {
  const [open, setOpen] = useState(false);

  const searchFilter = (inputValue, path) => path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  const displayRender = labels => <span>{labels[labels.length - 1]}</span>;

  const handleValue = (e) => {
    const { onChange } = input;
    if (!touch) onTouch();
    onChange(e[e.length - 1]);
  };

  const options = getOptions(issueCategory2);
  const value = input.value ? getPath(options, input.value) : input.value;

  return (
    <div className={`box-select${!disabled && touch && error ? '--error' : ''} fns-select-${open}`}>
      <Cascader
        disabled={disabled}
        style={{ maxWidth: '317px', marginBottom: '18px' }}
        value={value}
        options={options}
        onChange={e => handleValue(e)}
        placeholder={defaultValue}
        displayRender={displayRender}
        onPopupVisibleChange={e => setOpen(e)}
        showSearch={{ searchFilter }}
      />
      {!open && !disabled && touch && ((error && <span className="fns-msg--error">{error}</span>) || (warning && <span className="fns-msg--warning">{warning}</span>))}
    </div>
  );
};

export default FormNestedSelect;
