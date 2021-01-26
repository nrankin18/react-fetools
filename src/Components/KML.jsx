import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./Progress";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import PulseLoader from "react-spinners/PulseLoader";
import FileSaver from "file-saver";

class KML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      file: null,
      readingStatus: "File",
      convertingStatus: "File",
      artcc: 0,
      artccHigh: 0,
      artccLow: 0,
      geo: 0,
      labels: 0,
      regions: 0,
      sids: [],
      stars: [],
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

  convert() {
    this.setState({ step: 4 });
    const worker = new Worker("Workers/ConvertSCT.js");
    worker.postMessage({
      artcc: this.state.artcc,
      artccHigh: this.state.artccHigh,
      artccLow: this.state.artccLow,
      geo: this.state.geo,
      regions: this.state.regions,
      labels: this.state.labels,
      sids: this.state.sids,
      stars: this.state.stars,
      data: this.state.parsedObject,
    });
    worker.onmessage = function (e) {
      if (e.data.isStatus) {
        this.setState({ convertingStatus: e.data.status });
      } else {
        var kml = new Blob([e.data.kml], {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(kml, "sector.kml");
        this.setState({ step: 5 });
      }
    }.bind(this);
  }

  render() {
    const sids = [];
    const stars = [];
    if (this.state.parsedObject) {
      this.state.parsedObject.sid.forEach((sid, name) => {
        sids.push(
          <div
            className="map sid"
            key={name}
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
            key={name}
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
                <input
                  type="checkbox"
                  id="artcc-check"
                  onClick={(e) => {
                    this.setState({ artcc: e.target.checked });
                  }}
                />
                <label htmlFor="artcc-check">ARTCC Boundaries</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="artcc-high-check"
                  onClick={(e) => {
                    this.setState({ artccHigh: e.target.checked });
                  }}
                />
                <label htmlFor="artcc-high-check">ARTCC High Boundaries</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="artcc-low-check"
                  onClick={(e) => {
                    this.setState({ artccLow: e.target.checked });
                  }}
                />
                <label htmlFor="artcc-low-check">ARTCC Low Boundaries</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="geo-check"
                  onClick={(e) => {
                    this.setState({ geo: e.target.checked });
                  }}
                />
                <label htmlFor="geo-check">Geography</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="labels-check"
                  onClick={(e) => {
                    this.setState({ labels: e.target.checked });
                  }}
                />
                <label htmlFor="labels-check">Labels</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="regions-check"
                  onClick={(e) => {
                    this.setState({ regions: e.target.checked });
                  }}
                />
                <label htmlFor="regions-check">Regions</label>
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
            <Button
              className="next-button"
              variant="success"
              onClick={() => this.convert()}
            >
              Convert
            </Button>
          </div>
          <div
            className={
              this.state.step === 4 ? "step-container" : "step-container hidden"
            }
          >
            <div className="status">
              <i>Coverting {this.state.convertingStatus}</i>
              <PulseLoader
                color="#777777"
                css={`
                  margin-left: 10px;
                `}
                size={10}
              />
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

export default KML;
