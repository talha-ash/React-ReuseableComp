import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import style from "./style.module.css";
const ListItemTemp = [
  "Hello World",
  "NiceWorld",
  "Bad World",
  "Sposicated World"
];

const getListFromSearch = (key, list) => {
  if (key === "") {
    return [...list];
  }
  return list.filter(item => {
    return item.includes(key);
  });
};

const Debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    let context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
/////////////////////////////////////////////////////////
const SearchDropDown = props => {
  const InputRef = useRef();
  const ListRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (isActive) {
      ListRef.current.classList.add("active");
    } else {
      ListRef.current.classList.remove("active");
    }
  });
  const handleInputChange = e => {
    let ListItems = getListFromSearch(InputRef.current.value, ListItemTemp);
    if (ListItems.length >= 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setListItems(ListItems);
  };

  const handleItemSelect = e => {};

  const CloneInput = React.useCallback(() => {
    return React.cloneElement(props.children[0], {
      onChange: Debounce(handleInputChange, props.delayInputTime),
      ref: InputRef,
      key: "1234"
    });
  }, [props.children, props.delayInputTime]);

  const CloneList = () => {
    return React.cloneElement(props.children[1], {
      ref: ListRef,
      children: listItems.map(item => {
        return (
          <li key={item} onClick={handleItemSelect}>
            {item}
          </li>
        );
      })
    });
  };

  return (
    <>
      <CloneInput />
      <CloneList />
    </>
  );
};

export default SearchDropDown;
