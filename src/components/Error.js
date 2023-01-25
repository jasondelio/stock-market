import "./Error.css";
import WarningIcon from "@mui/icons-material/Warning";

function Error(props) {
  return (
    <div className="error-container">
      <WarningIcon sx={{ fontSize: 85 }} />
      <h1>Something went wrong</h1>
      <div className="error-message">{props.message}</div>
    </div>
  );
}

export default Error;
