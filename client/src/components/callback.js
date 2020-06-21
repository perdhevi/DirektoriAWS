import React, { Component } from "react";
//import { Link } from "react-router-dom";

class Callback extends Component {
  componentDidMount() {
    if (/access_token|id_token|err/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL");
    }
  }

  render() {
    return <div>Loading...</div>;
  }
}

export default Callback;
