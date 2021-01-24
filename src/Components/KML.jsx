import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./Progress";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

class KML extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, file: null };
  }

  componentDidUpdate() {
    console.log(this.state.file);
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
              onDragOver={console.log("over")}
              onDragEnter={console.log("enter")}
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
              <div
                className="next-button"
                onClick={() => this.setState({ step: 2 })}
              >
                Next
              </div>
            </Button>
          </div>
          <div
            className={
              this.state.step === 2 ? "step-container" : "step-container hidden"
            }
          >
            {"Reading " + (this.state.file ? this.state.file.name : "") + "..."}
            <textarea readOnly>Line 1 Line 2 Line 3</textarea>
          </div>
        </div>
      );
    } else return null;
  }
}

export default KML;
