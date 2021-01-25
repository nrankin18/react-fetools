import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

class Progress extends React.Component {
  render() {
    const steps = [];
    var i;
    for (i = 1; i <= this.props.steps; i++) {
      steps.push(
        <Step transition="scale" key={i}>
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "complete" : ""}`} />
          )}
        </Step>
      );
    }

    return (
      <ProgressBar
        percent={((this.props.step - 1) / (this.props.steps - 1)) * 100}
        filledBackground="linear-gradient(to right, rgb(45, 119, 180), rgb(54, 166, 213))"
      >
        {steps}
      </ProgressBar>
    );
  }
}

export default Progress;
