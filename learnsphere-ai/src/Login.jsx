import { Link } from "react-router-dom";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Login page is ready. Backend authentication will be connected later.");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <Link to="/" className="logo">
          LearnSphere<span> AI</span>
        </Link>

        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>Continue your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            minLength="6"
            required
          />

          <button type="submit" className="auth-submit">
            Log in <span>→</span>
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <Link to="/" className="back-home">← Back to home</Link>
      </div>
    </section>
  );
}

export default Login;