import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import background from "/images/produce.jpg";
import CategoryMenu from "../CategoryMenu";

function Nav() {

  const mystyle = {
   
    background:'rgb(102, 255, 255)',
    padding: "5px",
    fontFamily: "Arial",
    borderRadius:15,
  }; 

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li style ={mystyle} >
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
        <li className="mx-1">
          <Link to="/signup">
            Signup
          </Link>
        </li>
        <li className="mx-1">
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
      );
    }
  }

  return (
    <header style={{ height: 140, backgroundImage: `url(${background})`}}>
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag"><img className ="Me" src="images/groceries.png" width="80" height="90" alt="Me" />
</span>
          Ez-Shop
        </Link>
      </h1>

      <nav style={{ float:"right", marginRight:80, marginTop:-50 }}>
        {showNavigation()}
      </nav>
    </header>
    
  );
}

export default Nav;
