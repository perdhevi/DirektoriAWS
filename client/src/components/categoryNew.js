import React from "react";

class CategoryNew extends React.Component {
  componentDidMount() {
    console.log("mounting Category New");
    console.log(this.props);
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui raised segment"> New Category </div>
        <div className="ui raised segment">
          <form>
            <label>Name</label>
            <input id="name" name="name" />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CategoryNew;
