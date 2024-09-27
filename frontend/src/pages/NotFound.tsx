import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const sectionStyle = {
  height: "911px",
  backgroundImage: "url(" + logo + ")",
  backgroundPosition: "left",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto",
  backgroundColor : "#9868ad"
};

const NotFound = () => {
  return (
    <div style={sectionStyle}>
        {" "}
        <div style={{ textAlign: "center" , paddingTop:400}}>
          <h1 style={{ color:"white"}}>404 Not Found</h1>
            <br></br>
          <h3 style={{ color:"white"}}>Opps... the page you are looking for is not found.</h3>
          <br></br>
          <Link to="/" style={{ color : "pink", fontSize: "30px", textDecoration : "underline" }} >Go to Homepage</Link>
        </div>
    </div>
  );
};

export default NotFound;
