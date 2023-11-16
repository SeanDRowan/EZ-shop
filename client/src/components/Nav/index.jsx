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
// if loggen in show signin/signup. else show order history/ logout
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

    <header style={{ height: 140,postition:'relative', backgroundImage: `url(${background})`}}>
     
      <h1 >
     
        <Link style ={{background:'rgb(0, 153, 51,0.3)',width:300, height:100,position:'absolute', borderRadius:50,   marginTop:7,}} to="/">
          <span  role="img" aria-label="shopping bag"><img src="images/groceries.png" width="80" height="90" />
</span>
          Ez-Shop
        </Link>
        
      </h1>

      <nav style={{ float:"right", marginRight:80,}}>
        {showNavigation()}
      </nav>
    </header>
    
  );
}

export default Nav;
