import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class MIA extends React.Component {
  render() {
    if (this.props.visible) {
      return (
        <div className="coming">
          <i>Coming soon...</i>
        </div>
      );
    } else return null;
  }
}

export default MIA;
