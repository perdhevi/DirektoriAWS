import React from "react";
import { connect } from "react-redux";
import { fetchStores } from "../actions";
import { Link } from "react-router-dom";

class StoreList extends React.Component {
  componentDidMount() {
    console.log("mounting Storelist");
    this.props.fetchStores(this.props);
  }

  renderList() {
    if (!this.props.stores) {
      return <div>Loading...</div>;
    } else {
      return this.props.stores.map((store) => {
        const editLink = "/stores/" + store.id;
        return (
          <div className="item" key={store.id}>
            <i>
              <div className="ui grid">
                <div className="two wide column">image here</div>
                <div className="eight wide column">
                  <div className="description">
                    <h3>{store.name}</h3>
                    <p>
                      {store.phone}
                      <br />
                      {store.address}
                    </p>
                  </div>
                </div>
                <div className="two wide column">
                  <div className="ui button">
                    <Link to={editLink}>Edit</Link>
                  </div>
                </div>
              </div>
            </i>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui raised segment"> Store list</div>
        <div className="ui button">
          <Link to="/stores/new" className="button item">
            New Store
          </Link>
        </div>
        <div className="ui segment">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapping store to props", ownProps);
  return { stores: state.stores.data };
};

export default connect(mapStateToProps, { fetchStores })(StoreList);