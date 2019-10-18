import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TestFormReport = (props) => {
  return (
    <div className="field-wrapper--report">
      <Document file="https://dbdlab-storage.s3.amazonaws.com/report/2019/10/16/HowToDesignSNGcompressed_4365f.pdf">
        <Page />
      </Document>
    </div>
  );
};

export default TestFormReport;
