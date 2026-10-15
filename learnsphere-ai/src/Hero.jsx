function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          ✦ YOUR PERSONAL AI LEARNING PARTNER
        </div>

        <h1>
          Learn smarter.
          <br />
          <span>Achieve more.</span>
        </h1>

        <p>
          Your learning journey, powered by AI.
          Understand difficult topics, generate quizzes,
          and build confidence with every study session.
        </p>

        <div className="hero-actions">
          <a href="#get-started" className="primary-btn">
            Start Learning Free ↗
          </a>
          <a href="#features" className="secondary-btn">
            Explore Features
          </a>
        </div>

        <div className="hero-stats">
          <div><strong>AI-powered</strong><span>Personalized learning</span></div>
          <div><strong>On your time</strong><span>Learn at your pace</span></div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-orb"></div>
        <div className="ai-card">
          <div className="ai-card-header">
            <span className="ai-icon">✦</span>
            <div>
              <strong>LearnSphere AI</strong>
              <small>Your study assistant</small>
            </div>
            <span className="online-dot"></span>
          </div>

          <div className="chat-message user-message">
            Explain React in simple words.
          </div>

          <div className="chat-message ai-message">
            <span className="response-label">✦ AI RESPONSE</span>
            React is a JavaScript library used to build user interfaces.
            It lets you create reusable pieces called components.
            <div className="topic-tags">
              <span>Components</span>
              <span>Props</span>
              <span>State</span>
            </div>
          </div>

          <div className="chat-input">
            <span>Ask anything about your studies...</span>
            <span className="send-icon">↑</span>
          </div>
          <small className="demo-note">Interactive AI chat will be connected later.</small>
        </div>
      </div>
    </section>
  );
}

export default Hero;