import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./Progress";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import PulseLoader from "react-spinners/PulseLoader";

class KML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      file: null,
      readingStatus: "File",
      artcc: new Map(),
      artccHigh: new Map(),
      artccLow: new Map(),
      sid: new Map(),
    };
  }

  readFile() {
    this.setState({ step: 2 });
    var reader = new FileReader();
    reader.onload = function () {
      const worker = new Worker("Workers/ParseSCT.js");
      worker.postMessage(reader.result);
      worker.onmessage = function (e) {
        if (e.data.isStatus) {
          this.setState({ readingStatus: e.data.status });
        } else {
          console.log(e.data.parsedObject);
          this.setState({ step: 3 });
        }
      }.bind(this);
    }.bind(this);

    reader.readAsText(this.state.file);
  }

  render() {
    if (this.props.visible) {
      return (
        <div className="page-container">
          <Progress steps={5} step={this.state.step} />
          <div
            className={
              this.state.step === 1 ? "step-container" : "step-container hidden"
            }
          >
            <Dropzone
              onDrop={(acceptedFiles) => {
                if (acceptedFiles !== null)
                  this.setState({ file: acceptedFiles[0] });
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className={`drop-zone ${
                      this.state.file !== null ? "drop-zone-success" : ""
                    }`}
                  >
                    <input {...getInputProps()} accept=".sct, .sct2" />
                    <FontAwesomeIcon
                      icon={this.state.file !== null ? faCheck : faUpload}
                      className={
                        this.state.file !== null
                          ? "upload-icon-success upload-icon"
                          : "upload-icon"
                      }
                    />
                    <p>
                      {this.state.file !== null
                        ? this.state.file.name
                        : "Upload .sct or .sct2 file"}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <Button
              className={
                this.state.file !== null
                  ? "next-button"
                  : "next-button disabled"
              }
            >
              <div className="next-button" onClick={() => this.readFile()}>
                Next
              </div>
            </Button>
          </div>
          <div
            className={
              this.state.step === 2 ? "step-container" : "step-container hidden"
            }
          >
            <div className="status">
              <i>Reading {this.state.readingStatus}</i>
              <PulseLoader
                color="#777777"
                css={`
                  margin-left: 10px;
                `}
                size={10}
              />
            </div>
          </div>
          <div
            className={
              this.state.step === 3 ? "step-container" : "step-container hidden"
            }
          >
            <h3>Select maps to convert:</h3>
            <input type="checkbox" id="geo-check" />
            <label>GEO Section</label>
          </div>
        </div>
      );
    } else return null;
  }
}

export default KML;
