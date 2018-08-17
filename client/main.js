import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import App from "../imports/ui/App.js";


Meteor.startup(() => {

  //Took from https://stackoverflow.com/a/37115083
  window.addEventListener('popstate', function(event) {
    // The popstate event is fired each time when the current history entry changes.

    var r = confirm("You pressed a Back button! Are you sure?!");

    if (r == true) {
        // Call Back button programmatically as per user confirmation.
        history.back();
        // Uncomment below line to redirect to the previous page instead.
        // window.location = document.referrer // Note: IE11 is not supporting this.
    } else {
        // Stay on the current page.
        history.pushState(null, null, window.location.pathname);
    }

    history.pushState(null, null, window.location.pathname);

  }, false);
  render(<App />, document.getElementById("render-target"));
});