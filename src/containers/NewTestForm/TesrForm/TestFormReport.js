import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TestFormReport = (props) => {
  const [pageNum, setPageNum] = useState(2);

  return (
    <div className="field-wrapper--report">
      <Document
        file="https://dbdlab-storage.s3.amazonaws.com/report/2019/10/16/HowToDesignSNGcompressed_4365f.pdf"
        onLoadSuccess={() => console.log('success')}
        onLoadError={(error) => console.log(error.message)}
        options={{
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
      >
        <Page />
      </Document>
    </div>
  );
};

export default TestFormReport;
