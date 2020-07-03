import React, { useEffect } from "react";
import Modal from "../common/Modal";
import { fetchStore, findStoreById } from "../../redux/actions/actStore";
import { connect } from "react-redux";
import { deleteStore } from "../../api/stores";

function StoreDelete(props) {
  //  const [store, setStore] = useState({ ...props.store });

  useEffect(() => {});

  const actions = (
    <React.Fragment>
      <button
        className="ui negative button"
        value={props.match.params.StoreId}
        onClick={handleDelete}
      >
        Delete
      </button>
      <button
        className="ui button"
        onClick={() => props.history.push("/stores")}
      >
        Cancel
      </button>
    </React.Fragment>
  );

  function handleDelete(e) {
    console.log(e.target.value);
    deleteStore(props.auth, e.target.value).then(() =>
      props.history.push("/stores")
    );
  }

  console.log(props);
  return (
    <div>
      StoreDelete
      <Modal
        {...props}
        actions={actions}
        onDismiss={() => props.history.push("/stores")}
        content={`Are you sure you want to delete ${props.store.name}`}
      />
    </div>
  );
}
function mapStateToProps(state, ownProps) {
  console.log("StoreDelete:mapping store to props", state);

  const storeId = ownProps.match.params.StoreId;

  return { store: findStoreById(state.stores.items, storeId) };
}

export default connect(mapStateToProps, { fetchStore })(StoreDelete);
