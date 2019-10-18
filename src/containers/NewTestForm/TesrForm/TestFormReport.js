import React from 'react';
import { PDFReader } from 'react-read-pdf';

const TestFormReport = (props) => {
  return (
    <div className="field-wrapper--report">
      <PDFReader
        url="https://dbdlab-storage.s3.amazonaws.com/report/2019/10/16/HowToDesignSNGcompressed_4365f.pdf"
      />
    </div>
  );
};

export default TestFormReport;
