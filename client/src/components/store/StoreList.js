import React from "react";
import { connect } from "react-redux";
import { fetchStores } from "../../redux/actions/actStore";
import { Link } from "react-router-dom";
//import { deleteStore } from "../../api/stores";

class StoreList extends React.Component {
  componentDidMount() {
    console.log("mounting Storelist");
    this.props.fetchStores(this.props);
  }

  renderList() {
    if (!this.props.stores.items) {
      return <div>Loading...</div>;
    } else {
      if (this.props.stores.items.length > 0)
        return this.props.stores.items.map((store) => {
          const editLink = "/stores/" + store.StoreId + "/edit";
          const deleteLink = "/stores/" + store.StoreId + "/delete";
          const imageUrl = store.attachmentUrl
            ? store.attachmentUrl
            : "https://direktori-store-images-dev.s3.amazonaws.com/default-store.png";
          //const deleteText = "Are you sure you want to delete " + store.name;
          return (
            <div className="item" key={store.StoreId}>
              <i>
                <div className="ui grid">
                  <div className="two wide column">
                    <img src={imageUrl} width="50" height="50" alt="No Store" />
                  </div>
                  <div className="six wide column">
                    <div className="description">
                      <h3>{store.name}</h3>
                      <p>
                        {store.phone}
                        <br />
                        {store.address}
                      </p>
                    </div>
                  </div>
                  <div className="four wide column">
                    <div>
                      <div className="ui button">
                        <Link to={editLink}>Edit</Link>
                      </div>
                      <div className="ui button">
                        <Link to={deleteLink}>Delete</Link>
                      </div>
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
      <div className="ui segment" ref={this.wrapper}>
        <div className="ui raised segment">My Stores</div>
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
  console.log("StoreList:mapping store to props", state);
  return { stores: state.stores };
};

export default connect(mapStateToProps, { fetchStores })(StoreList);
