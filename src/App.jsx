import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import WhatIDo from './components/WhatIDo.jsx';
import Experience from './components/Experience.jsx';
import Work from './components/Work.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <WhatIDo />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
