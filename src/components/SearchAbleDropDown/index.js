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
      document.addEventListener("mousedown", handleMouseClick, false);
    } else {
      ListRef.current.classList.remove("active");
      document.removeEventListener("mousedown", handleMouseClick, false);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseClick, false);
    };
  }, [isActive, listItems]);

  const handleMouseClick = e => {
    if (ListRef.current.contains(e.target)) {
      return;
    }
    setIsActive(false);
  };
  const handleInputChange = e => {
    let ListItems = getListFromSearch(InputRef.current.value, ListItemTemp);
    if (ListItems.length >= 1) {
      setIsActive(true);
      setListItems(ListItems);
    } else {
      setIsActive(false);
    }
  };

  const handleItemSelect = item => {
    InputRef.current.value = item;
  };

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
          <li key={item} onClick={() => handleItemSelect(item)}>
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
