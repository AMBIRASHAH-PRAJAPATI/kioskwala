import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";

export default function HeroSection() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStartedClick = () => {
    navigate(isLoggedIn ? '/services' : '/login');
  };

  return (
    <header id="HeroSection">
      <div className="herocntbox">
        <div className="herocontent">
          <h1> One Stop ,</h1>
          <h1> for all your banking needs</h1>
          <p>
            Welcome to our bank's website, Your one-stop kiosk for all banking needs. Quick, easy and
            accessible.
          </p>
          <div>
            <button className="herobtn" onClick={handleGetStartedClick}>
              Open Bank Section
            </button>
          </div>
        </div>
        <div className="Heropic">
          <img
            src="/assets/heropic.webp"
            alt="Kiosk"
          />
        </div>
      </div>
      <div id="herotap">
      <p>Providing all the banking services for all the banks at one single stop.</p>
      </div>
    </header>
  );
}
