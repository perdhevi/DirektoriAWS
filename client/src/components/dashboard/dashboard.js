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
        const imageUrl = store.attachmentUrl
          ? store.attachmentUrl
          : "https://direktori-store-images-dev.s3.amazonaws.com/default-store.png";
        const storeName =
          store.name.charAt(0).toUpperCase() + store.name.slice(1);
        return (
          <div className="ui centered card" key={store.StoreId}>
            <div className="image">
              <div className="center aligned">
                <img src={imageUrl} width="250" height="250" alt="No Store" />
              </div>
            </div>
            <div className="content">
              <div className="header">{storeName}</div>
              <div className="description">{store.address}</div>
            </div>
            <div className="extra content">
              <span className="right floated">
                {store.phone ? store.phone : "none"}
              </span>
            </div>
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
          More...
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
      <div className="ui segment">
        <div className="ui link cards">{this.renderList()}</div>
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
