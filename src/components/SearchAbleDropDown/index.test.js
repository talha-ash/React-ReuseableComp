import React from "react";
import ReactDOM from "react-dom";
import SearchAbleDropDown from "../SearchAbleDropDown";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchAbleDropDown />, div);
  ReactDOM.unmountComponentAtNode(div);
});
