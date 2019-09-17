import React from 'react';
import PageTemplate from 'containers/PageTemplate';
import FormSelect from 'components/FormSelect';
import FormInput from 'components/FormInput';
import PopupTemplate from 'components/PopupTemplate';

const Temp = () => {
  const testArr = [
    '바나나', '체리', '소고기',
  ];

  const style = {
    width: '1200px',
    margin: '0 auto',
  };

  return (
    <PageTemplate>
      <div style={style}>
        <div>components 모음집</div>
        <FormInput placeholder="???" name="a" />
        <hr />
        <FormSelect defaultValue="카테고리 선택">
          <option value="카테고리 선택" disabled>카테고리 선택</option>
          {testArr.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </FormSelect>
        <hr />
        <hr />
        <PopupTemplate title="hi" />
      </div>
    </PageTemplate>
  );
};

export default Temp;
