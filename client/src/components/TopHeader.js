import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopHeader extends Component {
  render() {
    const { login, logout, isAuthenticated } = this.props.auth;

    return (
      <div className="ui menu top ">
        <div className="item">
          <Link to="/">Home</Link>
        </div>
        {isAuthenticated() ? (
          <div className="item">
            <Link to="/stores">Store</Link>
          </div>
        ) : (
          <div></div>
        )}
        {isAuthenticated() ? (
          <div className="item">
            <Link to="/categories">Category</Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className="item right">
          {!isAuthenticated() ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>
    );
  }
}

export default TopHeader;
