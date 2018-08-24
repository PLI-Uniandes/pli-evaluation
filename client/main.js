import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "../imports/ui/App.js";

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

Meteor.startup(() => {
  
  render(<AlertProvider template={AlertTemplate} {...options}>
          <App />
          </AlertProvider>,
        document.getElementById("render-target"));

});