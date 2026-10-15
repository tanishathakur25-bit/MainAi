// const features = [
//   {
//     icon: "✦",
//     number: "01",
//     title: "AI Study Assistant",
//     description:
//       "Understand complex topics with clear explanations and personalized guidance.",
//     tag: "Powered by Gemini"
//   },
//   {
//     icon: "▤",
//     number: "02",
//     title: "Smart Quiz Generator",
//     description:
//       "Turn your study topics into practice questions to test your understanding.",
//     tag: "Practice smarter"
//   },
//   {
//     icon: "◷",
//     number: "03",
//     title: "Learning Dashboard",
//     description:
//       "Keep your study activities organized and track your learning progress.",
//     tag: "Your progress"
//   },
//   {
//     icon: "↗",
//     number: "04",
//     title: "Feedback & Support",
//     description:
//       "Share feedback and help make your learning experience better.",
//     tag: "We listen"
//   }
// ];

// function Features() {
//   return (
//     <section className="features-section" id="features">
//       <div className="section-heading">
//         <span className="section-label">BUILT FOR YOUR GROWTH</span>
//         <h2>Everything you need to <span>learn better.</span></h2>
//         <p>One platform. Smarter tools. A better way to study.</p>
//       </div>

//       <div className="features-grid">
//         {features.map((feature) => (
//           <article className="feature-card" key={feature.number}>
//             <div className="feature-top">
//               <span className="feature-icon">{feature.icon}</span>
//               <span className="feature-number">{feature.number}</span>
//             </div>
//             <h3>{feature.title}</h3>
//             <p>{feature.description}</p>
//             <span className="feature-tag">{feature.tag}</span>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Features;



import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "✦",
    number: "01",
    title: "AI Study Assistant",
    description:
      "Understand complex topics with clear explanations and personalized guidance.",
    tag: "Powered by Gemini",
    path: "/features/ai-assistant/"
  },
  {
    icon: "▤",
    number: "02",
    title: "Smart Quiz Generator",
    description:
      "Turn your study topics into practice questions to test your understanding.",
    tag: "Practice smarter",
    path: "/features/quiz-generator/"
  },
  {
    icon: "◷",
    number: "03",
    title: "Learning Dashboard",
    description:
      "Keep your study activities organized and track your learning progress.",
    tag: "Your progress",
    path: "/features/study-planner/"
  },
  {
    icon: "↗",
    number: "04",
    title: "Feedback & Support",
    description:
      "Share feedback and help make your learning experience better.",
    tag: "We listen",
    path: "/features/feedback/"
  }
];

function Features() {
  const navigate = useNavigate();

  return (
    <section className="features-section" id="features">
      <div className="section-heading">
        <span className="section-label">BUILT FOR YOUR GROWTH</span>
        <h2>
          Everything you need to <span>learn better.</span>
        </h2>
        <p>One platform. Smarter tools. A better way to study.</p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <article
            className="feature-card"
            key={feature.number}
            role="link"
            tabIndex={0}
            onClick={() => navigate(feature.path)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(feature.path);
              }
            }}
          >
            <div className="feature-top">
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-number">{feature.number}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="feature-tag">{feature.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
