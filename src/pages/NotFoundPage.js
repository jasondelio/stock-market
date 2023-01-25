import NavBar from "../components/NavBar";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  //On click handler for back to home button
  function buttonHandler() {
    navigate("/home");
  }
  return (
    <div>
      <NavBar />
      <div className="message-wrapper">
        <h1 className="icon-404">404</h1>
        <h1>Page not found</h1>
        <p className="not-found-message">
          The page you are looking for doesn't exist or an other error occurred.
        </p>
        <button onClick={buttonHandler} className="go-back-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
