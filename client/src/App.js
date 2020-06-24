import React, { Component } from "react";
import TopHeader from "./components/TopHeader";
import Dashboard from "./components/dashboard";
import { Route } from "react-router-dom";

import StoreList from "./components/StoreList";
import StoreCreate from "./components/StoreCreate";

import CategoryList from "./components/categoryList";
import CategoryNew from "./components/categoryNew";

import Auth from "./auth/auth";
import Callback from "./components/callback";

class App extends Component {
  //function App() {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render(props) {
    return (
      <div className="container">
        <TopHeader auth={this.auth} {...props} />
        <Route
          path="/"
          exact
          render={(props) => <Dashboard auth={this.auth} {...props} />}
        />
        <Route
          path="/callback"
          exact
          render={(props) => <Callback auth={this.auth} {...props} />}
        />
        <Route
          path="/stores"
          exact
          render={(props) => <StoreList auth={this.auth} {...props} />}
        />
        <Route
          path="/stores/new"
          exact
          render={(props) => <StoreCreate auth={this.auth} {...props} />}
        />
        <Route
          path="/categories"
          exact
          render={(props) => <CategoryList auth={this.auth} {...props} />}
        />
        <Route
          path="/categories/new"
          exact
          render={(props) => <CategoryNew auth={this.auth} {...props} />}
        />
      </div>
    );
  }
}

export default App;
