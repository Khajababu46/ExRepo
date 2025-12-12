
import React, { useRef, useEffect, useState } from 'react';
import './App.css';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const sectionRefs = useRef({});
  const [visibleSections, setVisibleSections] = useState({});
  const [headerAnimated, setHeaderAnimated] = useState(false);

  // Smooth scroll to section
  const handleNavClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Section fade-in on scroll
  useEffect(() => {
    setHeaderAnimated(true);
    const handleScroll = () => {
      const newVisible = {};
      sections.forEach(({ id }) => {
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            newVisible[id] = true;
          }
        }
      });
      setVisibleSections((prev) => ({ ...prev, ...newVisible }));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-container">
      <header className={`portfolio-header${headerAnimated ? ' animate-header' : ''}`}>
        <h1>Your Name</h1>
        <nav>
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={e => {
                e.preventDefault();
                handleNavClick(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section
          id="home"
          className={`section home-section fade-section${visibleSections['home'] ? ' visible' : ''}`}
          ref={el => (sectionRefs.current['home'] = el)}
        >
          <h2>Home</h2>
          <p>Welcome to my portfolio website! I am a [Your Profession].</p>
        </section>

        <section
          id="about"
          className={`section about-section fade-section${visibleSections['about'] ? ' visible' : ''}`}
          ref={el => (sectionRefs.current['about'] = el)}
        >
          <h2>About</h2>
          <p>Brief introduction about yourself, your background, and your passion.</p>
        </section>

        <section
          id="skills"
          className={`section skills-section fade-section${visibleSections['skills'] ? ' visible' : ''}`}
          ref={el => (sectionRefs.current['skills'] = el)}
        >
          <h2>Skills</h2>
          <ul className="skills-list">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React.js</li>
            <li>Other relevant skills</li>
          </ul>
        </section>

        <section
          id="projects"
          className={`section projects-section fade-section${visibleSections['projects'] ? ' visible' : ''}`}
          ref={el => (sectionRefs.current['projects'] = el)}
        >
          <h2>Projects</h2>
          <div className="project-card">
            <h3>Project Title</h3>
            <p>Short description of the project, technologies used, and your role.</p>
          </div>
          {/* Add more project cards as needed */}
        </section>

        <section
          id="contact"
          className={`section contact-section fade-section${visibleSections['contact'] ? ' visible' : ''}`}
          ref={el => (sectionRefs.current['contact'] = el)}
        >
          <h2>Contact</h2>
          <p>Email: your.email@example.com</p>
          <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">yourprofile</a></p>
        </section>
      </main>

      <footer className="portfolio-footer">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
