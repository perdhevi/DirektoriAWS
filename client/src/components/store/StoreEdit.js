import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StoreForm from "./StoreForm";
import { fetchStore, findStoreById } from "../../redux/actions/actStore";
import { fetchCategory } from "../../redux/actions/actCategory";
import { connect } from "react-redux";
import { updateStore } from "../../api/stores";
import StoreImage from "./StoreImage";

const StoreEdit = ({ fetchCategory, categories, ...props }) => {
  const [store, setStore] = useState({ ...props.store });
  useEffect(() => {
    console.log("StoreEdit:useEffect");
    fetchCategory();
    console.log("StoreEdit:useEffect.done");
  }, []);

  function handleChange(event) {
    const updatedStore = {
      ...store,
      [event.target.name]: event.target.value,
    };
    setStore(updatedStore);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //console.log(store);
    updateStore(props.auth, store).then(() => {
      props.history.push("/stores/");
    });
    //createStore(props.auth, store);
    console.log("submitted");
  }

  if (!store) {
    return <div>loading</div>;
  } else {
    return (
      <div className="ui segment">
        <div className="ui form">
          <div className="ui segment header">Store Edit</div>

          <StoreForm
            store={store}
            categories={categories}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <StoreImage store={store} auth={props.auth} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  console.log("StoreEdit:mapping store to props", state);

  const storeId = ownProps.match.params.StoreId;
  if (state.categories && state.categories.items) {
    const cats = state.categories.items.map((category) => {
      return {
        value: category.categoryId,
        text: category.description,
        iconPath: category.iconPath,
      };
    });
    return {
      categories: cats,
      store: findStoreById(state.stores.items, storeId),
    };
  } else {
    return {
      categories: state.categories,
      store: findStoreById(state.stores.items, storeId),
    };
  }
}

StoreEdit.propTypes = {
  fetchCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, { fetchStore, fetchCategory })(
  StoreEdit
);
