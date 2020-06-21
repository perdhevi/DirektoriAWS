import React from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../actions";
import { Link } from "react-router-dom";

class CategoryList extends React.Component {
  componentDidMount() {
    console.log("mounting Categorylist");
    this.props.fetchCategory(this.props);
  }

  renderList() {
    if (!this.props.categories) {
      return <div>Loading...</div>;
    } else {
      return this.props.categories.map((category) => {
        return (
          <div className="item" key={category.id}>
            <i>
              <div className="ui grid">
                <div className="eight wide column">
                  <div className="description">
                    <h3>{category.name}</h3>
                    <p>{category.notes}</p>
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
        <div className="ui raised segment"> Category list</div>
        <div className="ui button">
          <Link to="/categories/new" className="button item">
            New Category
          </Link>
        </div>
        <div className="ui segment">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapping category to props", ownProps);
  console.log(state);
  return { categories: state.categories.data };
};

export default connect(mapStateToProps, { fetchCategory })(CategoryList);
