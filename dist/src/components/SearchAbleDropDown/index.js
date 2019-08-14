"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styleModule = _interopRequireDefault(require("./style.module.css"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getListFromSearch = function getListFromSearch(key, list) {
  if (key === "") {
    return _toConsumableArray(list);
  }

  return list.filter(function (item) {
    return item.includes(key);
  });
};

var Debounce = function Debounce(func, wait) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = _this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}; /////////////////////////////////////////////////////////


var SearchDropDown = function SearchDropDown(props) {
  var InputRef = (0, _react.useRef)();
  var ListRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isActive = _useState2[0],
      setIsActive = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      listItems = _useState4[0],
      setListItems = _useState4[1];

  (0, _react.useEffect)(function () {
    if (isActive) {
      ListRef.current.classList.add("active");
      document.addEventListener("mousedown", handleMouseClick, false);
    } else {
      ListRef.current.classList.remove("active");
      document.removeEventListener("mousedown", handleMouseClick, false);
    }

    return function () {
      document.removeEventListener("mousedown", handleMouseClick, false);
    };
  }, [isActive, listItems]);

  var handleMouseClick = function handleMouseClick(e) {
    if (ListRef.current.contains(e.target)) {
      return;
    }

    setIsActive(false);
  };

  var handleInputChange = function handleInputChange(e) {
    var ListItems = getListFromSearch(InputRef.current.value, props.list);

    if (ListItems.length >= 1) {
      setIsActive(true);
      setListItems(ListItems);
    } else {
      setIsActive(false);
    }
  };

  var handleItemSelect = function handleItemSelect(item) {
    InputRef.current.value = item;
  };

  var CloneInput = _react.default.useCallback(function () {
    return _react.default.cloneElement(props.children[0], {
      onChange: Debounce(handleInputChange, props.delayInputTime),
      ref: InputRef,
      key: "1234"
    });
  }, [props.children, props.delayInputTime]);

  var CloneList = function CloneList() {
    return _react.default.cloneElement(props.children[1], {
      ref: ListRef,
      children: listItems.map(function (item) {
        return _react.default.createElement("li", {
          key: item,
          onClick: function onClick() {
            return handleItemSelect(item);
          }
        }, item);
      })
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(CloneInput, null), _react.default.createElement(CloneList, null));
};

var _default = SearchDropDown;
exports.default = _default;

//# sourceMappingURL=index.js.map