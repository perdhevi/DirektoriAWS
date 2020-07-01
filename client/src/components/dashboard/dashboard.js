import React from "react";
import { connect } from "react-redux";
import { fetchAllStores } from "../../redux/actions/actStore";
//import { Link } from "react-dom";

class Dashboard extends React.Component {
  componentDidMount() {
    console.log("Mounting dashboard");
    console.log(this.props);

    this.props.fetchAllStores("");
  }

  renderList() {
    console.log("Rendering List");
    console.log(this.props);
    if (!this.props.allstores) {
      return <div>Loading...</div>;
    } else {
      return this.props.allstores.Items.map((store) => {
        return (
          <div className="item" key={store.StoreId}>
            <i>
              <div className="ui grid">
                <div className="two wide column">
                  <img
                    src={store.imageUrl}
                    width="50"
                    height="50"
                    alt="No Store"
                  />
                </div>
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
              </div>
            </i>
          </div>
        );
      });
    }
  }

  handleNext(param) {
    console.log("next handle:", param);
    param.fetchAllStores(param.allstores.LastEvaluatedKey.StoreId);
  }

  renderButton(nextKey) {
    if (nextKey) {
      return (
        <button
          className="ui button"
          onClick={() => {
            this.handleNext(this.props);
          }}
        >
          Next
        </button>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const nextKey = this.props.allstores
      ? this.props.allstores.LastEvaluatedKey
      : "";

    return (
      <div className="basic segment">
        {this.renderList()}
        <div className="ui basic segment">{this.renderButton(nextKey)}</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("AllStore:mapping store to props", ownProps, state);
  if (state.allstores)
    return {
      allstores: state.allstores.items,
    };
  else return {};
}

export default connect(mapStateToProps, { fetchAllStores })(Dashboard);
