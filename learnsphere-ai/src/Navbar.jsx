import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function goHome() {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goToSection(sectionId) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <nav className="navbar">
      <button type="button" className="logo nav-home-button" onClick={goHome}>
        LearnSphere<span> AI</span>
      </button>

      <div className="nav-links">
        <button type="button" className="nav-link-button" onClick={goHome}>
          Home
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => goToSection("features")}
        >
          Features
        </button>

        <button
          type="button"
          className="nav-link-button"
          onClick={() => goToSection("about")}
        >
          About
        </button>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="login-btn">Log in</Link>
        <Link to="/register" className="start-btn">Get Started ↗</Link>
      </div>
    </nav>
  );
}



export default Navbar;