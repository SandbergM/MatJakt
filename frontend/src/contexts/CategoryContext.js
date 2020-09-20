import React, { createContext, Component } from "react";

export const CategoryContext = createContext();

class CategoryContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    let data = await fetch(`http://127.0.0.1:3001/categories`);
    data = await data.json();
    this.setState({ categories: data });
  }

  render() {
    return (
      <CategoryContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryContextProvider;
