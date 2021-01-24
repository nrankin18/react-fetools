import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Create from "../Components/Create";
import KML from "../Components/KML";
import MIA from "../Components/MIA";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  setPage(page) {
    this.setState({ page: page });
  }

  render() {
    return (
      <div>
        <Header page={this.state.page} setPage={this.setPage.bind(this)} />
        <Create visible={this.state.page === 0} />
        <KML visible={this.state.page === 1} />
        <MIA visible={this.state.page === 2} />
      </div>
    );
  }
}

export default App;
