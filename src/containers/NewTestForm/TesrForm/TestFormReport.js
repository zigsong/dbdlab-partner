import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class TestFormReport extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  componentDidMount = () => {
    document.onkeydown = (e) => {
      e = e || window.event;

      if (e.keyCode == '37') {
        this.changePage(-1);
      } else if (e.keyCode == '39') {
        this.changePage(1);
      }
    };
  }

  handleWheelEvent = (e) => {
    console.log(e.deltaY);
    if (e.deltaY < 0) {
      this.changePage(-1);
    } else if (e.deltaY > 0) {
      this.changePage(1);
    }
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = (offset) => {
    const { numPages } = this.state;
    this.setState(prevState => ({
      pageNumber: Math.min(Math.max(1, prevState.pageNumber + offset), numPages),
    }));
  };

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { pageNumber, numPages } = this.state;
    const { report } = this.props;

    return (
      <div className="field-wrapper--report">
        <div className="report__contents scroll-container" onWheel={e => this.handleWheelEvent(e)}>
          <Document
            file={report}
            onLoadSuccess={this.onDocumentLoadSuccess}
            onLoadError={error => console.log(error.message)}
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
            <p>
              Page
              {' '}
              {pageNumber || (numPages ? 1 : '--')}
              {' '}
              of
              {' '}
              {numPages || '--'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TestFormReport;
