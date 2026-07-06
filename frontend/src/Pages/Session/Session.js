import { Link, useNavigate } from "react-router-dom";
import session from "../../Images/session.png";
import ButtonThemes from "../../libs/ButtonThemes/ButtonThemes";
import token from "../../Common/token";

function Session() {
  const navigate = useNavigate();
  const navigateHome=()=>{
    navigate("/Login");
    token.setTokens(null);
    token.setExpryTm(null);
  };
  return (
    <div className="auth-page">
      <div className="glass-card auth-card" style={{textAlign:'center'}}>
        <img
          src={session}
          alt="session"
          style={{
            width: "20%",
            height: "auto"
          }}
        />
        <h2>Session Expired</h2>
        <p className="auth-subtitle">Something went wrong or your session has expired.</p>
        <button onClick={navigateHome} className="btn-primary-theme full-width" style={{ display: "inline-block", textDecoration: "none" }}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Session;