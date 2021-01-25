import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Create extends React.Component {
  render() {
    if (this.props.visible) {
      return (
        <div className="status">
          <i>Coming soon...</i>
        </div>
      );
    } else return null;
  }
}

export default Create;
