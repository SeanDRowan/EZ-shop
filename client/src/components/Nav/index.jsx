import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import background from "/images/produce.jpg";

function Nav() {

  const mystyle = {
   
    background:'rgb(0, 153, 51)',
    padding: "5px",
    fontFamily: "Arial",
    borderRadius:15,
    margin:20
  }; 

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row" style={{listStyle:'none'}}>
          <li style ={mystyle} >
            <Link to="/orderHistory">
              Order History   
            </Link>
          </li> 
        
          <li style ={mystyle}>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row" style={{listStyle:'none'}}>
        <li style ={mystyle}>
          <Link to="/signup">
            Signup
          </Link>
        </li>
        <li style ={mystyle}>
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
      );
    }
  }

  return (
    <header style={{ height: 130,  backgroundImage: `url(${background})`,}}>
      <h1 style ={{margin:0}}>
        <Link to="/">
          <span role="img" aria-label="shopping bag"><img src="images/groceries.png" width="80" height="90" alt="Me" />
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
