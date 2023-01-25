import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar(props) {
  const page = props.page;

  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <li className="icon">STOCK MARKET</li>
        <li>
          <Link
            to="/home"
            className={page === "Home" ? "chosen-navbar-item" : "navbar-item"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/stocks"
            className={page === "Stocks" ? "chosen-navbar-item" : "navbar-item"}
          >
            Stocks
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
