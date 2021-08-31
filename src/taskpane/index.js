import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import "bootstrap/dist/js/bootstrap.bundle.min";

initializeIcons();

let isOfficeInitialized = false;
let item = {};
const title = "Casepeer Add-In";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component
        title={title}
        isOfficeInitialized={isOfficeInitialized}
        item={item}
      />
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  $(document).ready(function() {
    Office.context.mailbox.addHandlerAsync(
      Office.EventType.ItemChanged,
      loadNewItem,
      function(result) {
        if (result.status === Office.AsyncResultStatus.Failed) {
          // Handle error.
        }
      }
    );
  });
  render(App);
};

const loadNewItem = () => {
  item = Office.context.mailbox.item;
  render(App);
};

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
