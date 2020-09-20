import React, { createContext, Component } from "react";

export const AutoCompleteContext = createContext();

class AutoCompleteContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      autoCompleteSuggestions: [],
    };
  }

  fetchSuggestions = async (name) => {
    let data = await fetch(
      `http://localhost:3001/autoCompleteSuggestion/${name}`
    );
    data = await data.json();
    await this.setState({ autoCompleteSuggestions: data });
    console.log(this.state.autoCompleteSuggestions);
  };

  render() {
    return (
      <AutoCompleteContext.Provider
        value={{
          ...this.state,
          onFetchSuggestions: this.fetchSuggestions,
        }}
      >
        {this.props.children}
      </AutoCompleteContext.Provider>
    );
  }
}

export default AutoCompleteContextProvider;
