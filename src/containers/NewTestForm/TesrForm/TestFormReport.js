import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import pdf from 'https://dbdlab-storage.s3.amazonaws.com/report/2019/10/16/HowToDesignSNGcompressed_4365f.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

console.log(pdf);

const TestFormReport = (props) => {
  return (
    <div className="field-wrapper--report">
      <Document file={pdf} onLoadError={(error) => console.log('Error while loading page! ' + error.message)}>
        <Page />
      </Document>
    </div>
  );
};

export default TestFormReport;
