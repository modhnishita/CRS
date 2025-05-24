import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import useWindowWidth from "./useWindowWidth";
import "./HomePage.css"; // External stylesheet for clean separation

const HomePage = () => {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  useEffect(() => {
  document.title = "Home | Course Recommender";
  }, []);
  
  return (
    <div className={`homepage-container ${isMobile ? "mobile" : "desktop"}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/">
          <img src="img2.jpg" alt="Home Icon" /> Home
        </Link>
        <Link to="/Questionnaire">Questionnaire</Link>
      </nav>

      {/* College Header */}
      <section className="College">
        <div className="logo">
          <img src="SVKM Logo.png" alt="SVKM Logo" />
        </div>
        <h1>
          Shri Vile Parle Kelavani Mandal's <br />
          NARSEE MONJEE COLLEGE OF <br />
          COMMERCE & ECONOMICS (AUTONOMOUS)
        </h1>
      </section>

      {/* Hero Image */}
      <div className="img1">
        <img src="img1.jpg" alt="Career paths illustration" />
      </div>

      {/* Text Boxes */}
      <div className="text-box">
        {isMobile ?
        "Confused about your interests and course selection?":
        "Confused about what interests you and which course to select as per your interest?"}
      </div>
      <div className="text1-box">
        Here is the solution. Answer a few questions.
      </div>

      {/* Button */}
      <button className="button1" onClick={() => navigate ("/Questionnaire")}>
        Let's begin
      </button>
    </div>
  );
};

export default HomePage;
