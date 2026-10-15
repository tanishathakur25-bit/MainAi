import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./App.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />

        <section className="about-section" id="about">
          <span className="section-label">OUR MISSION</span>
          <h2>
            Make learning feel <span>limitless.</span>
          </h2>
          <p>
            LearnSphere AI brings study assistance and practice tools
            together in one simple, student-friendly platform.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a href="/" className="logo">
          LearnSphere<span> AI</span>
        </a>
        <p>Learn at your pace. Grow every day.</p>
        <span>© 2026 LearnSphere AI</span>
      </footer>
    </>
  );
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/features/ai-assistant/*"
        element={
          <iframe
            src="/features/ai-assistant/index.html"
            title="AI Study Assistant"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        }
      />

      <Route
        path="/features/quiz-generator/*"
        element={
          <iframe
            src="/features/quiz-generator/index.html"
            title="Smart Quiz Generator"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        }
      />

      <Route
        path="/features/study-planner/*"
        element={
          <iframe
            src="/features/study-planner/index.html"
            title="AI Study Planner"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        }
      />

      <Route
        path="/features/feedback/*"
        element={
          <iframe
            src="/features/feedback/index.html"
            title="Feedback and Support"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        }
      />
    </Routes>
  );
}

export default App;

