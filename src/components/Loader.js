import "./Loader.css";

function Loader(props) {
  const size = props.size;
  return <div className="loader" style={{ height: size, width: size }}></div>;
}

export default Loader;
