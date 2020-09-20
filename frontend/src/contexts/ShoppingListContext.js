import React, { createContext, Component } from "react";

export const ShoppingListContext = createContext();

class ShoppingListContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      shoppingList: [],
    };
  }

  componentDidMount() {
    this.loadFromLocalStorage();
  }

  addProductToList = async (product) => {
    await this.setState({
      shoppingList: this.state.shoppingList.concat(product),
    });
    this.saveToLocalStorage();
  };

  loadFromLocalStorage = async () => {
    let data = await JSON.parse(
      localStorage.getItem("matjaktSavedProductsList")
    );
    if (data) {
      this.setState({ shoppingList: data });
    }
  };

  removeProductFromList = async (item) => {
    let arr = this.state.shoppingList;
    let index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
      this.setState({ shoppingList: arr });
    }
    this.saveToLocalStorage();
  };

  saveToLocalStorage = async () => {
    await localStorage.setItem(
      "matjaktSavedProductsList",
      JSON.stringify(this.state.shoppingList)
    );
  };

  render() {
    return (
      <ShoppingListContext.Provider
        value={{
          ...this.state,
          onAddProductToList: this.addProductToList,
          onRemoveProductFromList: this.removeProductFromList,
        }}
      >
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}

export default ShoppingListContextProvider;
