import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class TestFormReport extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { pageNumber, numPages } = this.state;
    const { report } = this.props;

    return (
      <div className="field-wrapper--report">
        <div className="report__contents scroll-container">
          <Document
            file={report}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onLoadError={(error) => console.log(error.message)}
            options={{
              cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
            }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="box-btn--report">
            <button
              type="button"
              className="btn--prev"
              disabled={pageNumber <= 1}
              onClick={this.previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn--next"
              disabled={pageNumber >= numPages}
              onClick={this.nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TestFormReport;
