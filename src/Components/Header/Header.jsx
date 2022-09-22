import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import "./Header.css";

function CollapsibleExample() {
  return (
    <Navbar className="nev navbar_home" collapseOnSelect expand="lg" bg="" variant="" >
      <Container>
        <Navbar.Brand href="#home" className="home">
          <Link to="/">
            <img src="ule_maticogo.png" alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle>
          <AiOutlineMenu className="text-white"></AiOutlineMenu>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto alna">
            <Nav.Link href="#home" className="hxn text-white">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#about" className="hxn text-white">
              <Link to="/About_main">About</Link>
            </Nav.Link>
            <Nav.Link href="#explore" className="hxn text-white">
              <Link to="/Explore_main">Explore</Link>
            </Nav.Link>
            <Nav.Link href="#how_to_play" className="hxn text-white">
              <Link to="/How_to_play_main">How To Play</Link>
            </Nav.Link>
            {/* <Nav.Link href="#tokenomics" className="hxn text-white">
              <Link to="/Tokenomics_main">Tokenomics</Link>
            </Nav.Link>
            <Nav.Link href="#pricing" className="hxn text-white">
              Marketplace
            </Nav.Link> */}
          </Nav>
          {/* <Nav.Link href="#register" className="text-white">
          <span className="wallet">
                <FaWallet></FaWallet>
              </span>
          <div class="dropdown">
                <a class=" dropdown-toggle register_btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Register
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                  <Link to="/Registration_with_BNB">

                    <a class="dropdown-item" href="#"> <img src="BNB.png" alt="" width="25%" /> BNB </a>
                    </Link>
                    </li>
                    <li>
                  <Link to="/Register_with_Matic">
                      
                      <a class="dropdown-item" href="#">
                      <img src="polygon.png" alt="" width="30%" />
                      MATIC
                    </a>
                  </Link>
                    </li>

                </ul>
              </div>
              </Nav.Link> */}
          <Nav className="mt-2 emn">
            <Nav.Link href="#login" className="text-white">
              <Link to="/Login_main">
                <span className="wallet">
                  <FaWallet></FaWallet>
                </span>
                Login
              </Link>
            </Nav.Link>
            {/* <Nav.Link href="#register" className="text-white"> */}
              <Link to="#" className="text-white text-white-1">
              <span className="wallet">
                <FaWallet></FaWallet>
              </span>


              <div class="dropdown">
                <a class=" dropdown-toggle register_btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  Register
                </a>

                <ul class="dropdown-menu manu-drop" aria-labelledby="dropdownMenuLink">
                  <li>
                  <Link to="/Registration_with_BNB">

                    <a class="dropdown-item" href="#"> <img src="BNB.png" alt="" width="25%" /> BNB </a>
                    </Link>
                    </li>
                    <li>
                  <Link to="/Register_with_Matic">
                      
                      <a class="dropdown-item" href="#">
                      <img src="polygon.png" alt="" width="30%" />
                      MATIC
                    </a>
                  </Link>
                    </li>

                </ul>
              </div>

              </Link>
            {/* </Nav.Link> */}
            <Nav.Link href="#pricing">
              <Link to="/Login_main">
                <img src="metamaskU.png" width="40px" alt="" />
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
