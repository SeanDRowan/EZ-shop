import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import background from "/images/produce.jpg";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
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
    <header style={{ height: 100,  backgroundImage: `url(${background})`}}>
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">img? </span>
          Ez-Shop
        </Link>
      </h1>

      <nav style={{ float:"right", marginRight:80 }}>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
