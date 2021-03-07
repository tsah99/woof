import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="title">Why Woof?</div>
      <div className="subtitle">
        <div className="subtitle-text">The Problem</div>
        <div className="subtitle-symbols">1234 whats wrong 4321</div>
      </div>
      <div className="text-item">
        Majority of students watch recordings of lectures in online school. But,
        students are more isolated than ever when learning. And they’re all
        learning the same concepts, but can’t easily learn from each other or
        know what peers are thinking.
      </div>
      <div className="subtitle">
        <div className="subtitle-text">The Solution</div>
        <div className="subtitle-symbols">/ / /</div>
      </div>
      <div className="text-item">
        We built a social experience to watch lectures whenever you want. Learn
        from your class. Annotate the lecture with comments. And have fun on a
        platform dedicated to 10xing the experience watching lectures for
        students.
      </div>
      <div className="subtitle">
        <div className="subtitle-text">The Team</div>
        <div className="subtitle-symbols">A D G J</div>
      </div>
      <div className="text-item">
        This app was made with love, sweat, and not too many tears by Sam
        Gorman, Brian Zeng, JP Reilly, Kento Perera, and Tim Sah. We are a team
        of 5 Stanford seniors, creating this application (remotely) for CS194,
        the computer science capstone course. Feel free to reach out to learn
        more about this project and our team!
      </div>
    </div>
  );
}

export default About;
