import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Map from "./pages/Map";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Map />
      </Provider>
    );
  }
}
