import React, { useState, useRef, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import './FormNestedSelect.scss';
import { Cascader } from 'antd';

const FormNestedSelect = ({
  defaultValue, children, input, disabled, meta: { touched, error, warning }, up,
}) => {
  const [values, setValues] = useState(defaultValue);
  const [isActive, setActive] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const slct = useRef();
  const ul = useRef();

  useEffect(() => {
    const { onChange } = input;

    if (slct.current.value === defaultValue) {
      // console.log('test');
    } else if (input.value !== '') {
      slct.current.value = input.value;
      setValues(input.value);
      if (!disabled) setSelected(true);
      onChange(input.value);
    } else if (input.value === '' || input.value === undefined) {
      setValues(slct.current.value);
      onChange(slct.current.value);
    }
  }, [defaultValue, disabled, input, input.value]);

  const handleBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setActive(false);
    }, 200);
  };

  const handleValue = (e, reset) => {
    const { onChange } = input;
    const selectedValue = reset ? null : e.target.innerText;

    console.log('HandleValue why', selectedValue, JSON.stringify(input));
    // slct.current.value = selectedValue;
    // setValues(selectedValue);
    onChange(selectedValue);
    handleBlur(e);
  };

  const handleOpenList = (e) => {
    e.preventDefault();

    if (!disabled) {
      setActive(true);
      setSelected(true);
    }
  };

  const newArr = [];
  const hasDisabled = children[0].props.disabled;

  if (hasDisabled) newArr.push(children[0]);

  return (
    <div className={`box-select${!disabled && touched && error ? '--error' : ''} select--${input.name}`}>
      <select
        name={input.name}
        defaultValue={input.value && input.value !== '' ? input.value : defaultValue}
        className="select--hidden"
        ref={slct}
      >
        {children}
      </select>
      <div className="select">
        <span className="box-btn">
          <button
            className={`select__title${isSelected ? '--active' : ''}${isSelected && values === '' ? ' disabled' : ''}`}
            type="button"
            onFocus={() => input.onFocus()}
            onClick={e => handleOpenList(e)}
            onBlur={e => input.onBlur(handleBlur(e))}
          >
            {input.value ? input.value : (values || defaultValue) }
          </button>
        </span>
        { isActive
          ? (
            <ScrollContainer>
              <ul className={`select__list${up ? '--up' : ''} scroll-container`} ref={ul}>
                { up
                  ? (
                    <>
                      {newArr.concat(children[1]).map((c, i) => (
                        <li key={c.props.value} className="select__item">
                          <button
                            onClick={e => handleValue(e, i === 0)}
                            type="button"
                            className={i === 0 ? 'btn disabled' : 'btn'}
                            name={input.name}
                          >
                            {c.props.children}
                          </button>
                        </li>
                      ))}
                    </>
                  )
                  : (
                    <>
                      {newArr.concat(children[1]).map((c, i) => (
                        <li key={c.props.value} className="select__item">
                          <button
                            onClick={e => handleValue(e, i === 0)}
                            type="button"
                            className={i === 0 ? 'btn disabled' : 'btn'}
                            name={input.name}
                          >
                            {c.props.children}
                          </button>
                        </li>
                      ))}
                    </>
                  )
                }
              </ul>
            </ScrollContainer>
          )
          : null }
        {!disabled && touched && ((error && <span className="msg--error">{error}</span>) || (warning && <span className="msg--warning">{warning}</span>))}
      </div>
    </div>
  );
};

export default FormNestedSelect;
