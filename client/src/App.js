import React, { Component } from "react";
import TopHeader from "./components/common/TopHeader";
import Dashboard from "./components/dashboard/dashboard";
import { Route } from "react-router-dom";

import StoreList from "./components/store/StoreList";
import StoreCreate from "./components/store/StoreCreate";
import StoreEdit from "./components/store/StoreEdit";
import StoreDelete from "./components/store/StoreDelete";

//import CategoryList from "./components/category/categoryList";
//import CategoryNew from "./components/category/categoryNew";

import Auth from "./auth/auth";
import Callback from "./components/callback";

class App extends Component {
  //function App() {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render(props) {
    /*
    removed category routing
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

    */
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
          path="/stores/:StoreId/edit"
          exact
          render={(props) => <StoreEdit auth={this.auth} {...props} />}
        />
        <Route
          path="/stores/:StoreId/delete"
          exact
          render={(props) => <StoreDelete auth={this.auth} {...props} />}
        />
      </div>
    );
  }
}

export default App;
