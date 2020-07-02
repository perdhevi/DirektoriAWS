import React from "react";
import { connect } from "react-redux";
import { fetchStores } from "../../redux/actions/actStore";
import { Link } from "react-router-dom";
//import { deleteStore } from "../../api/stores";

class StoreList extends React.Component {
  state = { openConfirm: false };
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    console.log("mounting Storelist");
    this.props.fetchStores(this.props);
  }

  handleDelete(props, param) {
    console.log(props, param);
    //deleteStore(props.auth, param.StoreId);
    this.setState({ openConfirm: true });
  }
  open = () => this.setState({ openConfirm: true });
  close = () => this.setState({ openConfirm: false });

  renderList() {
    if (!this.props.stores.items) {
      return <div>Loading...</div>;
    } else {
      if (this.props.stores.items.length > 0)
        return this.props.stores.items.map((store) => {
          const editLink = "/stores/" + store.StoreId + "/edit";
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
                    <div
                      className="ui button"
                      value={store.StoreId}
                      onClick={() => {
                        this.handleDelete(this.props, store);
                      }}
                    >
                      <div className="ui modal" id="popModal">
                        <div className="header">Delete This?</div>
                      </div>
                      Delete
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
