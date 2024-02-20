import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom"; 
import {
  FaTelegramPlane,
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import "./CSS/Footer.css";
import { useAuth } from "../store/auth";

export default function Footer() {

  const navigate = useNavigate(); 
  const { isLoggedIn } = useAuth();
  const handleServicesClick = () => {
    if (isLoggedIn) {
      navigate("/services"); // Use navigate instead of history.push
      window.scrollTo(0, 0); 
    } else {
      navigate("/login");
      window.scrollTo(0, 0); 
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="upperfooter">
          <div id="letterbox">
            <h3>Enhanced Connectivity for Effortless Banking</h3>
            <p>
              Discover the simplicity of banking with us. Seamlessly navigate
              through our services and experience hassle-free access to all your
              financial needs.
            </p>
            <button className="herobtn">
              <ScrollLink to="HeroSection" smooth={true} duration={500}>
                Home
              </ScrollLink>
            </button>
          </div>
          <div className="footernav">
            <div className="menu-list">
              <h3>Menu</h3>
              <ul>
                <li>
                  <ScrollLink to="HeroSection" smooth={true} duration={500}>
                    Home
                  </ScrollLink>
                </li>
                <li onClick={handleServicesClick}>
                   <span>Services</span>
                </li>
                <li onClick={handleServicesClick}>
                <span>Open Bank Account</span> 
                </li>
              </ul>
            </div>
            <div className="help-list">
              <h3>Help</h3>
              <ul>
                <li>
                  <ScrollLink to="aboutusextra" smooth={true} duration={500}>
                    About Us
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="keypointscontainer"
                    smooth={true}
                    duration={500}
                  >
                    Benefits
                  </ScrollLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footertape">
          <div>
            <p>2024. All Right Reserved</p>
          </div>
          <div>
            <p>Privacy & Policy</p>
          </div>
          <div id="footersocialLink">
            <FaTelegramPlane />
            <FaFacebook />
            <FaInstagramSquare />
            <FaTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
}
