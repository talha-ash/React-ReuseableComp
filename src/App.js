import React from "react";
import "./App.css";
import SearchAbleDropDown from "./components/SearchAbleDropDown";
function App() {
  return (
    <div className="container">
      <SearchAbleDropDown delayInputTime={300}>
        <input
          name="search"
          id="search__input"
          placeholder="Search Something"
        />
        <ul className="ul-our" />
      </SearchAbleDropDown>
    </div>
  );
}

export default App;
