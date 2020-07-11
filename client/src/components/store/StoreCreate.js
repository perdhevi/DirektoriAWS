import React, { useState, useEffect } from "react";
import StoreForm from "./StoreForm";
import { createStore } from "../../api/stores";
import { connect } from "react-redux";
import { fetchCategory } from "../../redux/actions/actCategory";
import PropTypes from "prop-types";

const StoreCreate = ({ fetchCategory, categories, ...props }) => {
  const [store, setStore] = useState({ ...props.store });

  useEffect(() => {
    console.log("storeCreate:useEffect");
    fetchCategory();
    console.log("storeCreate:useEffect.done");
  }, []);

  function handleChange(event) {
    const updatedStore = { ...store, [event.target.name]: event.target.value };
    setStore(updatedStore);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(props);
    console.log(store);
    createStore(props.auth, store).then(() => {
      props.history.push("/stores/");
    });
    console.log("submitted");
  }
  console.log("categories", categories);
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="ui segment header">Store Create</div>

        <StoreForm
          store={store}
          categories={categories}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  if (state.categories && state.categories.items) {
    const cats = state.categories.items.map((category) => {
      return {
        value: category.categoryId,
        text: category.description,
        iconPath: category.iconPath,
      };
    });
    return { categories: cats };
  } else {
    return { categories: state.categories };
  }
}

StoreCreate.propTypes = {
  fetchCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { fetchCategory })(StoreCreate);
