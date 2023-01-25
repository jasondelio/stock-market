import { useState } from "react";
import "./Tabs.css";

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1);

  //On click handler for showing which tab is currently chosen
  function toggleTab(index) {
    setToggleState(index);
  }

  return (
    <div className="content-container">
      <div className="tabs-container">
        {props.children.map((child) => {
          const { index, label } = child.props;
          return (
            <button
              className={toggleState === index ? "tabs active-tabs" : "tabs"}
              key={index}
              onClick={() => toggleTab(index)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="content-tabs">
        {props.children.map((child) => {
          const { index } = child.props;
          return (
            <div
              className={
                toggleState === index ? "content  active-content" : "content"
              }
              key={index}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
