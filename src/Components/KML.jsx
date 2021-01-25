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
          this.setState({ step: 3, parsedObject: e.data.parsedObject });
        }
      }.bind(this);
    }.bind(this);

    reader.readAsText(this.state.file);
  }

  render() {
    const sids = [];
    const stars = [];
    if (this.state.parsedObject) {
      this.state.parsedObject.sid.forEach((sid, name) => {
        sids.push(
          <div
            className="map sid"
            onClick={(e) => {
              if (e.target.classList.contains("selected"))
                e.target.classList.remove("selected");
              else e.target.classList.add("selected");
            }}
          >
            {name}
          </div>
        );
      });
      this.state.parsedObject.star.forEach((star, name) => {
        stars.push(
          <div
            className="map star"
            onClick={(e) => {
              if (e.target.classList.contains("selected"))
                e.target.classList.remove("selected");
              else e.target.classList.add("selected");
            }}
          >
            {name}
          </div>
        );
      });
    }

    const nextButton =
      this.state.file !== null ? (
        <Button
          className="next-button"
          onClick={() => this.readFile()}
          variant="success"
        >
          Next
        </Button>
      ) : (
        <Button
          className="next-button"
          onClick={() => this.readFile()}
          variant="success"
          disabled
        >
          Next
        </Button>
      );

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
            {nextButton}
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
            <div className="check-container">
              <div>
                <input type="checkbox" id="artcc-check" />
                <label for="artcc-check">ARTCC Boundaries</label>
              </div>
              <div>
                <input type="checkbox" id="artcc-high-check" />
                <label for="artcc-high-check">ARTCC High Boundaries</label>
              </div>
              <div>
                <input type="checkbox" id="artcc-low-check" />
                <label for="artcc-low-check">ARTCC Low Boundaries</label>
              </div>
              <div>
                <input type="checkbox" id="geo-check" />
                <label for="geo-check">Geography</label>
              </div>
              <div>
                <input type="checkbox" id="labels-check" />
                <label for="labels-check">Labels</label>
              </div>
              <div>
                <input type="checkbox" id="regions-check" />
                <label for="regions-check">Regions</label>
              </div>
            </div>
            <div className="check-container">
              <div className="map-container">
                <h5 className="map-label">SIDs:</h5>
                <div className="map-list" id="sid-list">
                  {sids}
                </div>
                <div className="select-buttons-container">
                  <Button
                    variant="outline-secondary"
                    className="select-button"
                    onClick={() => {
                      Array.prototype.forEach.call(
                        document.getElementsByClassName("sid"),
                        function (e) {
                          e.classList.add("selected");
                        }
                      );
                    }}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="select-button"
                    onClick={() => {
                      Array.prototype.forEach.call(
                        document.getElementsByClassName("sid"),
                        function (e) {
                          e.classList.remove("selected");
                        }
                      );
                    }}
                  >
                    Select None
                  </Button>
                </div>
              </div>
              <div className="map-container">
                <h5 className="map-label">STARs:</h5>
                <div className="map-list">{stars}</div>
                <div className="select-buttons-container">
                  <Button
                    variant="outline-secondary"
                    className="select-button"
                    onClick={() => {
                      Array.prototype.forEach.call(
                        document.getElementsByClassName("star"),
                        function (e) {
                          e.classList.add("selected");
                        }
                      );
                    }}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="select-button"
                    onClick={() => {
                      Array.prototype.forEach.call(
                        document.getElementsByClassName("star"),
                        function (e) {
                          e.classList.remove("selected");
                        }
                      );
                    }}
                  >
                    Select None
                  </Button>
                </div>
              </div>
            </div>
            <Button className="next-button" variant="success">
              Convert
            </Button>
          </div>
        </div>
      );
    } else return null;
  }
}

export default KML;
